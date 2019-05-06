import { Injectable } from '@nestjs/common'
import reqIns from '@utils/z-axios'
import { BusinessUnitDTO } from '@module-back/dto/BusinessUnitDTO'
import { CertificateDTO } from '@module-back/dto/CertificateDTO'
import { TokenDataDto } from '@module-back/dto/TokenDataDto'

@Injectable()
export class BCertificateApi {
    /** 根据组织架构Id取得其下的业务单元一览 */
    getBussinessUnitByOrgId(orgId: string) {
        return reqIns.setUrl(`certificate/org-id/${orgId}`).get<BusinessUnitDTO[]>()
    }

    /** 根据业务单元id取凭证meta一览 */
    getCertificateMetaByBUnitId(bUnitId: string) {
        return reqIns.setUrl(`certificate/business-unit-id/${bUnitId}`).get<CertificateDTO[]>()
    }

    /** 根据业务单元 id 和 凭证 metaId 获取对应table的数据 */
    getCertificateMetaToken(bUnitId: string, metaId: string) {
        return reqIns
            .setUrl(`certificate/business-unit-id/${bUnitId}/certificate-meta-id/${metaId}`)
            .get<TokenDataDto[]>()
    }
}
