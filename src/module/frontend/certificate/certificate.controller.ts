import { Controller, Get, Param } from '@nestjs/common'
import { CertificateService } from './certificate.service'
import { BCertificateService } from '@module-back/b-certificate/b-certificate.service'

@Controller('certificate')
export class CertificateController {
    constructor(
        private readonly service: CertificateService,
        private readonly baseService: BCertificateService,
    ) {}

    @Get('user-id/:userId')
    getBussinessUnitByUserId(@Param('userId') userId: string) {
        return this.baseService.getBussinessUnitByUserId(userId)
    }

    /** 根据业务单元 id 获取对应的所有的 table 列定义 */
    @Get('business-unit-id/:bUnitId')
    getCertificateColumnsByBUnitId(@Param('bUnitId') bUnitId: string) {
        return this.service.getCertificateColumnsByBUnitId(bUnitId)
    }

    /**
     * 根据业务单元 id 和 凭证 metaId 获取对应table的数据
     */
    @Get('/business-unit-id/:bUnitId/meta-id/:metaId')
    getCertificateMetaToken(@Param('bUnitId') bUnitId: string, @Param('metaId') metaId: string) {
        return this.service.getCertificateMetaToken(bUnitId, metaId)
    }

    /** 获取原单 form 定义 */
    @Get('/source/business-unit-id/:bUnitId/meta-id/:metaId/token-id/:tokenId')
    getSourceForm(
        @Param('bUnitId') bUnitId: string,
        @Param('metaId') metaId: string,
        @Param('tokenId') tokenId: string,
    ) {
        return this.service.getSourceForm(bUnitId, metaId, tokenId)
    }
}
