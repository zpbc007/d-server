import { Injectable } from '@nestjs/common'
import { BBillService, BBillApi } from '@module-back/b-bill'
import { MetaService } from '@module-back/meta'
import { MergeSchemaService } from '@module-front/merge-schema'
import { IListItem } from '@type-comp/list-item'
import { ITableSchema, IColumn } from '@type-comp/table-schema'
import { ITableData } from '@type-comp/table-data'
import { addQuery } from '@hinata_hyuga/z-axios'

const operationKey = '_operation'

@Injectable()
export class BillService {
    constructor(
        private readonly backBillService: BBillService,
        private readonly backBillApi: BBillApi,
        private readonly metaService: MetaService,
        private readonly mergeSchemaService: MergeSchemaService,
    ) {}

    /** 获取表单页面定义与数据 */
    async getBillPageByMetaIdAndTokenId(bUnitId: string, metaId: string, tokenId: string) {
        // 获取 from 定义与数据
        const [formConfig, formData, tableList] = await Promise.all([
            // 获取 from 定义
            this.metaService.getFormSchemaByMetaId(metaId),
            // 获取 form 数据
            this.backBillService.getFormDataByMetaIdAndTokenId(metaId, tokenId),
            // 获取所有的 table 定义
            this.getRelMetaAndTableColumns(bUnitId, metaId, tokenId),
        ])

        return {
            formSchema: this.mergeSchemaService.createDefaultFormSchema(formConfig, false),
            formData,
            tableList,
        }
    }

    /** 获取业务节点的关联meta */
    async getRelMetaAndTableColumns(bUnitId: string, metaId?: string, tokenId?: string) {
        const metaList = await this.backBillApi.getRelMeta(bUnitId, metaId)
        const columnsPros = (metaList || []).map(({ tokenMetaId }) => {
            return this.metaService.getTableColumnsByMetaId(tokenMetaId)
        })
        const columns = await Promise.all(columnsPros)
        const panelList = columns.map(({ columnsConfig, columnsOrder }, index) => {
            const { tokenMetaId, tokenMetaName } = metaList[index]
            // 添加操作列
            columnsOrder.unshift(operationKey)
            return {
                text: tokenMetaName,
                value: {
                    metaId: tokenMetaId,
                    column: {
                        ...columnsConfig,
                        [operationKey]: {
                            ui_widget: 'action',
                            ui_fixed: 'left',
                            ui_width: 100,
                            ui_align: 'center',
                            ui_title: '操作',
                        } as IColumn,
                        ui_scrollX: 1500,
                        ui_title: '',
                        ui_showPagination: false,
                        ui_showRowSelect: false,
                        ui_rowKey: 'tokenId',
                        ui_order: columnsOrder,
                        ui_dataUrl: addQuery(`/bill/rel-data/${bUnitId}/${tokenMetaId}`, {
                            preMetaId: metaId,
                            preTokenId: tokenId,
                        }),
                    },
                },
            } as IListItem<{ metaId: string; column: ITableSchema }>
        })

        return panelList
    }

    /** 获取业务节点的关联meta下的数据 */
    async getRelData(bUnitId: string, metaId: string, preMetaId?: string, preTokenId?: string) {
        const data = await this.backBillService.getRelData(bUnitId, metaId, preMetaId, preTokenId)

        return {
            data: data.map(
                (rowData) =>
                    ({
                        ...rowData,
                        [operationKey]: [
                            {
                                ui_widget: 'link',
                                ui_title: '详情',
                                ui_url: `/bill/${bUnitId}/${metaId}/${rowData.tokenId}/`,
                                ui_size: 'small',
                            },
                        ],
                    } as ITableData),
            ),
        }
    }
}
