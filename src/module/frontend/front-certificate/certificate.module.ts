import { Module } from '@nestjs/common'
import { BackMetaModule, BackMetaService } from '@module-back/back-meta'
import {
    BackCertificateModule,
    BackCertificateService,
    BackCertificateApi,
} from '@module-back/back-certificate'
import { CertificateController } from './certificate.controller'
import { CertificateService } from './certificate.service'
import { BackBaseModule, BackBaseService } from '@module-back/back-base'
import { FrontAuthModule } from '../front-auth/auth.module'
import { MergeSchemaModule, MergeSchemaService } from '@module-front/front-merge-schema'

@Module({
    imports: [
        FrontAuthModule,
        BackBaseModule,
        BackMetaModule,
        BackCertificateModule,
        MergeSchemaModule,
    ],
    controllers: [CertificateController],
    providers: [
        BackBaseService,
        BackMetaService,
        BackCertificateService,
        BackCertificateApi,
        CertificateService,
        MergeSchemaService,
    ],
})
export class CertificateModule {}
