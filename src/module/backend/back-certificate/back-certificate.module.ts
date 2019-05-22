import { Module } from '@nestjs/common'
import { BackCertificateService } from './back-certificate.service'
import { BackCertificateApi } from './back-certificate.api'

@Module({
    providers: [BackCertificateApi, BackCertificateService],
    exports: [BackCertificateApi, BackCertificateService],
})
export class BackCertificateModule {}
