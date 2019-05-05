import { Injectable } from '@nestjs/common'
import reqIns from '@utils/z-axios'
import { BusinessUnitDTO } from '@module-back/dto/BusinessUnitDTO'
import { CertificateDTO } from '@module-back/dto/CertificateDTO'

@Injectable()
export class CertificateApi {
    /** 根据组织架构Id取得其下的业务单元一览 */
    getBussinessUnitByOrgId(orgId: string) {
        return reqIns.setUrl(`certificate/org-id/${orgId}`).get<BusinessUnitDTO[]>()
    }

    /** 根据业务单元id取凭证meta一览 */
    getCertificateMetaByBUnitId(bUnitId: string) {
        return reqIns.setUrl(`certificate/business-unit-id/${bUnitId}`).get<CertificateDTO[]>()
    }
}
