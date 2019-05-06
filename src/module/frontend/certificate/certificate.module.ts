import { Module } from '@nestjs/common'
import { MetaModule, MetaService } from '@module-back/meta'
import {
    BCertificateModule,
    BCertificateService,
    BCertificateApi,
} from '@module-back/b-certificate'
import { CertificateController } from './certificate.controller'
import { CertificateService } from './certificate.service'
import { BaseModule, BaseService } from '@module-back/base'

@Module({
    imports: [BaseModule, MetaModule, BCertificateModule],
    controllers: [CertificateController],
    providers: [BaseService, MetaService, BCertificateService, BCertificateApi, CertificateService],
})
export class CertificateModule {}
