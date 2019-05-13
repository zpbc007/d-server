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
import { OauthModule, OAuthApi } from '@module-back/oauth'
import { AuthService } from '@module-front/auth/auth.service'
import { MergeSchemaModule, MergeSchemaService } from '@module-front/merge-schema'

@Module({
    imports: [
        OauthModule,
        AuthModule,
        BaseModule,
        MetaModule,
        BCertificateModule,
        MergeSchemaModule,
    ],
    controllers: [CertificateController],
    providers: [
        OAuthApi,
        AuthService,
        BaseService,
        MetaService,
        BCertificateService,
        BCertificateApi,
        CertificateService,
        MergeSchemaService,
    ],
})
export class CertificateModule {}
