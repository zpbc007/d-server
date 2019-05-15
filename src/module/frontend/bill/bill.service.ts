import { Injectable } from '@nestjs/common'
import { BBillService, BBillApi } from '@module-back/b-bill'
import { MetaService } from '@module-back/meta'
import { MergeSchemaService } from '@module-front/merge-schema'
import { IListItem } from '@type-comp/list-item'
import { ITableSchema, IColumn } from '@type-comp/table-schema'
import { ITableData } from '@type-comp/table-data'
import { addQuery } from '@hinata_hyuga/z-axios'
import { TokenMetaInformationDto } from '@module-back/dto/TokenMetaInformationDto'
import { BaseService } from '@module-back/base'

const operationKey = '_operation'

@Injectable()
export class BillService {
    constructor(
        private readonly backBillService: BBillService,
        private readonly backBillApi: BBillApi,
        private readonly metaService: MetaService,
        private readonly mergeSchemaService: MergeSchemaService,
        private readonly baseService: BaseService,
    ) {}

    /** 获取编辑页面 form 定义 + 数据， 所有的 table 定义 （表头 定义 + 数据、 分录 定义、 关联单据 定义） */
    async getViewPage(bUnitId: string, metaId: string, tokenId: string) {
        const [
            formConfig,
            formData,
            pushDownMeta,
            relTableList,
            entryTableList,
        ] = await Promise.all([
            // 获取 from 定义
            this.metaService.getFormSchemaByMetaId(metaId),
            // 获取 form 数据
            this.backBillService.getFormDataByMetaIdAndTokenId(metaId, tokenId),
            // 获取下推数据
            this.backBillApi.getPushDownMeta(bUnitId, metaId, tokenId),
            // 获取所有的关联单据 table 定义
            this.getRelMetaAndTableColumns(bUnitId, metaId, tokenId),
            // 获取所有分录 table 定义
            this.getEntryMetaAndTableColumns(metaId, tokenId),
        ])

        return {
            formSchema: this.mergeSchemaService.createDefaultFormSchema(formConfig, false),
            formData,
            relTableList,
            entryTableList,
            pushdownMeta: (pushDownMeta || []).map(({ tokenMetaId, tokenMetaName }) => {
                return {
                    text: tokenMetaName,
                    value: tokenMetaId,
                } as IListItem<string>
            }),
        }
    }

    /** 获取添加页面 form 定义 + 数据， 所有的 table 定义 （表头 定义 + 数据、 分录 定义） */
    async getAddPage(bUnitId: string, metaId: string) {
        const [formConfig, { formData, tokenId }] = await Promise.all([
            // 获取 from 定义
            this.metaService.getFormSchemaByMetaId(metaId),
            // 创建表单
            this.backBillService.putBill(bUnitId, metaId),
        ])

        // 获取所有分录 table 定义
        const entryTableList = await this.getEntryMetaAndTableColumns(metaId, tokenId)

        return {
            tokenId,
            formSchema: this.mergeSchemaService.createDefaultFormSchema(formConfig, false),
            formData,
            entryTableList,
        }
    }

    /** 获取所有分录 meta 及其对应的 table 定义 */
    async getEntryMetaAndTableColumns(metaId: string, tokenId: string) {
        // 获取所有分录 meta
        const metaList = await this.backBillApi.getEntryMeta(metaId)
        return this.getTableColumnsByMetaList(
            metaList,
            ({ tokenMetaId }) => `/bill/entry/${metaId}/${tokenId}/${tokenMetaId}`,
        )
    }

    /** 获取业务节点的关联 meta 及其对应的 table 定义 */
    async getRelMetaAndTableColumns(bUnitId: string, metaId?: string, tokenId?: string) {
        // 获取对应的所有 meta
        const metaList = await this.backBillApi.getRelMeta(bUnitId, metaId)
        return this.getTableColumnsByMetaList(metaList, ({ tokenMetaId }) =>
            addQuery(`/bill/rel-data/${bUnitId}/${tokenMetaId}`, {
                preMetaId: metaId,
                preTokenId: tokenId,
            }),
        )
    }

    /**
     * 根据 metaList 获取每个 meta 对应的 table 定义
     */
    private async getTableColumnsByMetaList(
        metaList: TokenMetaInformationDto[],
        tableDataUrlFactory: (meta: TokenMetaInformationDto) => string,
    ) {
        // 获取每个 meta 对应的 table 定义
        const columnsPros = (metaList || []).map(({ tokenMetaId }) => {
            return this.metaService.getTableColumnsByMetaId(tokenMetaId)
        })
        const columns = await Promise.all(columnsPros)
        return columns.map(({ columnsConfig, columnsOrder }, index) => {
            const meta = metaList[index]
            const { tokenMetaId, tokenMetaName } = meta
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
                        ui_dataUrl: tableDataUrlFactory(meta),
                    },
                },
            } as IListItem<{ metaId: string; column: ITableSchema }>
        })
    }

    /** 获取业务节点的关联meta下的数据 */
    async getRelData(bUnitId: string, metaId: string, preMetaId?: string, preTokenId?: string) {
        const data = await this.backBillService.getRelData(bUnitId, metaId, preMetaId, preTokenId)
        return this.addOperationData(
            data,
            (rowData) => `/bill/${bUnitId}/${metaId}/${rowData.tokenId}`,
        )
    }

    /** 获取分录数据 */
    async getEntryData(billMetaId: string, billTokenId: string, entryMetaId: string) {
        const data = await this.backBillService.getEntryData(billMetaId, billTokenId, entryMetaId)

        return this.addOperationData(data, () => '')
    }

    // table 数据中添加操作列
    private addOperationData(data: any[], urlFactory: (rowData: any) => string) {
        return {
            data: data.map(
                (rowData) =>
                    ({
                        ...rowData,
                        [operationKey]: [
                            {
                                ui_widget: 'link',
                                ui_title: '详情',
                                ui_url: urlFactory(rowData),
                                ui_size: 'small',
                            },
                        ],
                    } as ITableData),
            ),
        }
    }

    /** 获取 select 类型 table 定义 */
    async getSelectTableColumns(metaId: string) {
        const { columnsConfig, columnsOrder } = await this.metaService.getTableColumnsByMetaId(
            metaId,
        )

        return {
            ...columnsConfig,
            ui_scrollX: 1500,
            ui_title: '',
            ui_showPagination: true,
            ui_selectMode: 'single',
            ui_rowKey: 'tokenId',
            ui_order: columnsOrder,
            ui_dataUrl: `/bill/select/data/${metaId}`,
        } as ITableSchema
    }

    /** 获取 select 类型 table 数据 */
    async getSelectTableData(metaId: string, pageNo: number, pageSize: number) {
        return this.baseService.getSelectTableData(metaId, pageNo, pageSize)
    }

    /** 保存表头数据 */
    saveBill(metaId: string, tokenId: string, formData) {
        return this.backBillService.saveBill(metaId, tokenId, formData)
    }

    /** 提交表头数据 */
    submitBill(bUnitId: string, metaId: string, tokenId: string, formData) {
        return this.backBillService.submitBill(bUnitId, metaId, tokenId, formData)
    }
}
