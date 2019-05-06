import { Module } from '@nestjs/common'
import { BCertificateService } from './b-certificate.service'
import { BCertificateApi } from './b-certificate.api'

@Module({
    providers: [BCertificateApi, BCertificateService],
    exports: [BCertificateApi, BCertificateService],
})
export class BCertificateModule {}
