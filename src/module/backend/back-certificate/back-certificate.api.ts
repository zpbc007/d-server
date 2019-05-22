import { Injectable, Scope, Inject } from '@nestjs/common'
import { BusinessUnitDTO } from '@module-back/back-dto/BusinessUnitDTO'
import { CertificateDTO } from '@module-back/back-dto/CertificateDTO'
import { TokenDataDto } from '@module-back/back-dto/TokenDataDto'
import { SourceBillDTO } from '@module-back/back-dto/SourceBillDTO'
import { CertificateReceiveDTO } from '@module-back/back-dto/CertificateReceiveDTO'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import { ZAxios } from '@hinata_hyuga/z-axios'
import { IBackendReqConfig, getBackendReqIns } from '@z-axios/back-axios'

@Injectable({ scope: Scope.REQUEST })
export class BackCertificateApi {
    private readonly reqIns: ZAxios<IBackendReqConfig>
    constructor(@Inject(REQUEST) private readonly request: Request) {
        this.reqIns = getBackendReqIns(this.request)
    }

    /** 根据组织架构Id取得其下的业务单元一览 */
    getBussinessUnitByOrgId(orgId: string) {
        return this.reqIns.setUrl(`/certificate/org-id/${orgId}`).get<BusinessUnitDTO[]>()
    }

    /** 根据业务单元id取凭证meta一览 */
    getCertificateMetaByBUnitId(bUnitId: string) {
        return this.reqIns
            .setUrl(`/certificate/business-unit-id/${bUnitId}`)
            .get<CertificateDTO[]>()
    }

    /** 根据业务单元 id 和 凭证 metaId 获取对应table的数据 */
    getCertificateMetaToken(bUnitId: string, metaId: string) {
        return this.reqIns
            .setUrl(`/certificate/business-unit-id/${bUnitId}/certificate-meta-id/${metaId}`)
            .get<TokenDataDto[]>()
    }

    /** 根据凭证查看原单,返回源单的 metaId 和 tokenId */
    getSourceBill(bUnitId: string, metaId: string, tokenId: string) {
        return this.reqIns
            .setUrl(
                `/certificate/getSourceBill/business-unit-id/${bUnitId}/certificate-tokenId/${tokenId}/certificate-meta-id/${metaId}`,
            )
            .get<SourceBillDTO>()
    }

    /** 接收凭证 */
    receiveCertificate(bUnitId: string, metaId: string, tokenId: string) {
        return this.reqIns
            .setUrl(
                `/certificate/getTargetBill/business-unit-id/${bUnitId}/certificate-tokenId/${tokenId}/certificate-meta-id/${metaId}`,
            )
            .get<CertificateReceiveDTO>()
    }
}
