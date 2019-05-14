import { Injectable } from '@nestjs/common'
import { BBillService, BBillApi } from '@module-back/b-bill'
import { MetaService } from '@module-back/meta'
import { MergeSchemaService } from '@module-front/merge-schema'
import { IListItem } from '@type-comp/list-item'
import { ITableSchema, IColumn } from '@type-comp/table-schema'
import { ITableData } from '@type-comp/table-data'

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
    async getBillPageByMetaIdAndTokenId(metaId: string, tokenId: string) {
        const [formConfig, data] = await Promise.all([
            this.metaService.getFormSchemaByMetaId(metaId),
            this.backBillService.getFormDataByMetaIdAndTokenId(metaId, tokenId),
        ])

        return {
            schema: this.mergeSchemaService.createDefaultFormSchema(formConfig, false),
            data,
        }
    }

    /** 获取业务节点的关联meta */
    async getRelMetaAndTableColumns(bUnitId: string, metaId?: string) {
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
                        ui_dataUrl: `/bill/rel-data/${bUnitId}/${tokenMetaId}`,
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
