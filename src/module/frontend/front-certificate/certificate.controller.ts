import { Controller, Get, Param, UseInterceptors, UseGuards } from '@nestjs/common'
import { CertificateService } from './certificate.service'
import { BackCertificateService } from '@module-back/back-certificate/back-certificate.service'
import { OAuthInterceptor } from '@interceptor/oauth.interceptor'
import { AuthGuard } from '@nestjs/passport'
import { AuthData } from 'dectorators/AuthData'
import { JwtPayload } from '../front-auth/jwt-payload.interface'

@Controller('certificate')
export class CertificateController {
    constructor(
        private readonly service: CertificateService,
        private readonly baseService: BackCertificateService,
    ) {}

    /** 获取业务单元一览 */
    @Get('business-unit')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(OAuthInterceptor)
    getBussinessUnitByUserId(@AuthData() authData: JwtPayload) {
        return this.baseService.getBussinessUnitByUserId(authData.user_id)
    }

    /** 根据业务单元 id 获取对应的所有的 table 列定义 */
    @Get('business-unit-id/:bUnitId')
    getCertificateColumnsByBUnitId(@Param('bUnitId') bUnitId: string) {
        return this.service.getCertificateColumnsByBUnitId(bUnitId)
    }

    /**
     * 根据业务单元 id 和 凭证 metaId 获取对应 table 的数据
     */
    @Get('/business-unit-id/:bUnitId/meta-id/:metaId')
    getCertificateMetaToken(@Param('bUnitId') bUnitId: string, @Param('metaId') metaId: string) {
        return this.service.getCertificateMetaToken(bUnitId, metaId)
    }

    /** 获取原单 form 定义与数据 */
    @Get('/source/business-unit-id/:bUnitId/meta-id/:metaId/token-id/:tokenId')
    getSourceForm(
        @Param('bUnitId') bUnitId: string,
        @Param('metaId') metaId: string,
        @Param('tokenId') tokenId: string,
    ) {
        return this.service.getSourceForm(bUnitId, metaId, tokenId)
    }

    /** 接收凭证 */
    @Get('/receive/business-unit-id/:bUnitId/meta-id/:metaId/token-id/:tokenId')
    receiveCertificate(
        @Param('bUnitId') bUnitId: string,
        @Param('metaId') metaId: string,
        @Param('tokenId') tokenId: string,
    ) {
        return this.service.receiveCertificate(bUnitId, metaId, tokenId)
    }
}
