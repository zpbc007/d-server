import { Injectable } from '@nestjs/common'
import { BackCertificateService, BackCertificateApi } from '@module-back/back-certificate'
import { BackMetaService } from '@module-back/back-meta'
import { ITableSchema, IColumn } from '@type-comp/table-schema'
import { ITableData } from '@type-comp/table-data'
import { BackBaseService } from '@module-back/back-base'
import { MergeSchemaService } from '@module-front/front-merge-schema'

const operationKey = '_operation'

@Injectable()
export class CertificateService {
    constructor(
        private readonly bCertificateService: BackCertificateService,
        private readonly bCertificateApi: BackCertificateApi,
        private readonly metaService: BackMetaService,
        private readonly baseService: BackBaseService,
        private readonly mergeSchemaService: MergeSchemaService,
    ) {}

    // 根据业务单元 id 获取对应的所有的 table 列定义
    async getCertificateColumnsByBUnitId(bUnitId: string) {
        const certificates = await this.bCertificateService.getCertificateMetaByBUnitId(bUnitId)
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
        const data = await this.bCertificateService.getCertificateMetaToken(bUnitId, metaId)

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

    /** 获取原单form数据 */
    async getSourceForm(bUnitId: string, metaId: string, tokenId: string) {
        // 获取原单 metaId tokenId
        const { sourceMetaId, sourceTokenId } = await this.bCertificateApi.getSourceBill(
            bUnitId,
            metaId,
            tokenId,
        )
        const [formConfig, formData] = await Promise.all([
            // 获取原单 form 定义
            this.metaService.getFormSchemaByMetaId(sourceMetaId),
            // 获取原单 form 数据
            this.baseService.getFormDataByMetaIdAndTokenId(sourceMetaId, sourceTokenId),
        ])

        return {
            schema: this.mergeSchemaService.createDefaultFormSchema(formConfig, true),
            data: formData,
        }
    }

    /** 接收凭证 */
    async receiveCertificate(bUnitId: string, metaId: string, tokenId: string) {
        const { receiveMetaId, billTokenId } = await this.bCertificateApi.receiveCertificate(
            bUnitId,
            metaId,
            tokenId,
        )

        return {
            metaId: receiveMetaId,
            tokenId: billTokenId,
        }
    }
}
