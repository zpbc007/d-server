import { Module } from '@nestjs/common'
import { CertificateController } from './certificate.controller'
import { CertificateService } from './certificate.service'
import { CertificateApi } from './certificate.api'

@Module({
    controllers: [CertificateController],
    providers: [CertificateApi, CertificateService],
})
export class CertificateModule {}
