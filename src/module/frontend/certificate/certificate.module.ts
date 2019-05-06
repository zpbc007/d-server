import { Module } from '@nestjs/common'
import { MetaModule, MetaService } from '@module-back/meta'
import { BCertificateModule, BCertificateService } from '@module-back/b-certificate'
import { CertificateController } from './certificate.controller'
import { CertificateService } from './certificate.service'

@Module({
    imports: [MetaModule, BCertificateModule],
    controllers: [CertificateController],
    providers: [MetaService, BCertificateService, CertificateService],
})
export class CertificateModule {}
