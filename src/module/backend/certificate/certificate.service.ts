import { Injectable } from '@nestjs/common'
import { CertificateApi } from './certificate.api'
import { IListItem } from '@type-comp/list-item'

@Injectable()
export class CertificateService {
    constructor(private readonly certificateApi: CertificateApi) {}

    /**
     * 通过用户id获取业务单元一览
     * @param userId 用户id
     */
    async getBussinessUnitByUserId(userId: string) {
        // TODO: 用户id到组织架构id的转换
        const orgId = '1001'
        const res = await this.certificateApi.getBussinessUnitByOrgId(orgId)

        return (res || []).map(({ businessUnitCode, businessUnitName }) => ({
            value: businessUnitCode,
            text: businessUnitName,
        })) as IListItem[]
    }

    /**
     * 根据业务单元id取凭证metaId
     * @param bUnitId 业务单元id
     */
    async getCertificateMetaByBUnitId(bUnitId: string) {
        bUnitId = 'caigouzhixing'
        const res = await this.certificateApi.getCertificateMetaByBUnitId(bUnitId)

        return (res || []).map(({ certificateMetaId, certificateName }) => ({
            value: certificateMetaId,
            text: certificateName,
        })) as IListItem[]
    }
}
