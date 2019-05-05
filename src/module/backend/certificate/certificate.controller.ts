import { Controller, Get, Param } from '@nestjs/common'
import { CertificateService } from './certificate.service'

@Controller('certificate')
export class CertificateController {
    constructor(private readonly certificateService: CertificateService) {}

    @Get('user-id/:userId')
    getBussinessUnitByUserId(@Param('userId') userId: string) {
        return this.certificateService.getBussinessUnitByUserId(userId)
    }

    @Get('business-unit-id/:bUnitId')
    getCertificateMetaByBUnitId(@Param('bUnitId') bUnitId: string) {
        return this.certificateService.getCertificateMetaByBUnitId(bUnitId)
    }
}
