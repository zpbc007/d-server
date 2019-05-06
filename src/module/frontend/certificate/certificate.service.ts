import { Injectable } from '@nestjs/common'
import { BCertificateService } from '@module-back/b-certificate'
import { MetaService } from '@module-back/meta'
import { ITableSchema, IColumn } from '@type-comp/table-schema'
import { ITableData } from '@type-comp/table-data'

const operationKey = '_operaction'

@Injectable()
export class CertificateService {
    constructor(
        private readonly baseService: BCertificateService,
        private readonly metaService: MetaService,
    ) {}

    // 根据业务单元 id 获取对应的所有的 table 列定义
    async getCertificateColumnsByBUnitId(bUnitId: string) {
        const certificates = await this.baseService.getCertificateMetaByBUnitId(bUnitId)
        const pros = (certificates || []).map(({ value }) => {
            return this.metaService.getTableColumnsByMetaId(value)
        })

        const columns = await Promise.all(pros)

        return columns.map(({ columnsOrder, columnsConfig }, index) => {
            const { text, value } = certificates[index]
            // 添加操作列
            columnsOrder.unshift(operationKey)
            const schema: ITableSchema = {
                ...columnsConfig,
                [operationKey]: {
                    ui_widget: 'action',
                    ui_fixed: 'left',
                    ui_title: '操作',
                    ui_width: 150,
                    ui_align: 'center',
                } as IColumn,
                ui_scrollX: 1500,
                ui_title: text,
                ui_showPagination: false,
                ui_showRowSelect: false,
                ui_order: columnsOrder,
                ui_rowKey: 'tokenId',
                ui_dataUrl: `/certificate/business-unit-id/${bUnitId}/meta-id/${value}`,
            }
            return schema
        })
    }

    /**
     * 根据业务单元 id 和 凭证 metaId 获取对应table的数据
     */
    async getCertificateMetaToken(bUnitId: string, metaId: string) {
        const data = await this.baseService.getCertificateMetaToken(bUnitId, metaId)

        return {
            // 添加操作列数据
            data: data.map((rowData) => ({
                ...rowData,
                [operationKey]: [
                    {
                        ui_widget: 'link',
                        ui_title: '详情',
                        ui_url: `/certificate/source/${bUnitId}/${rowData.tokenId}/${metaId}`,
                        ui_size: 'small',
                    },
                ],
            })),
        } as ITableData
    }
}
