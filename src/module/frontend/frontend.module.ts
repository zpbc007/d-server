import { Module } from '@nestjs/common'
import { CertificateModule } from './front-certificate/certificate.module'
import { FrontAuthModule } from './front-auth/auth.module'
import { UserModule } from './front-user/user.module'
import { BillModule } from './front-bill/bill.module'
import { MergeSchemaModule } from './front-merge-schema/merge-schema.module'

@Module({
    imports: [FrontAuthModule, CertificateModule, UserModule, BillModule, MergeSchemaModule],
})
export class FrontendModule {}
