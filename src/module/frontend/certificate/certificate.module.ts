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
import { AuthModule } from '../auth/auth.module'
import { MergeSchemaModule, MergeSchemaService } from '@module-front/merge-schema'

@Module({
    imports: [AuthModule, BaseModule, MetaModule, BCertificateModule, MergeSchemaModule],
    controllers: [CertificateController],
    providers: [
        BaseService,
        MetaService,
        BCertificateService,
        BCertificateApi,
        CertificateService,
        MergeSchemaService,
    ],
})
export class CertificateModule {}
