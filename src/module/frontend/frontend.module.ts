import { Module } from '@nestjs/common'
import { CertificateModule } from './certificate/certificate.module'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { BillModule } from './bill/bill.module'
import { MergeSchemaModule } from './merge-schema/merge-schema.module'

@Module({
    imports: [AuthModule, CertificateModule, UserModule, BillModule, MergeSchemaModule],
})
export class FrontendModule {}
