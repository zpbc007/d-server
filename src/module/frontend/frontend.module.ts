import { Module } from '@nestjs/common'
import { CertificateModule } from './certificate/certificate.module'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'

@Module({
    imports: [AuthModule, CertificateModule, UserModule],
})
export class FrontendModule {}
