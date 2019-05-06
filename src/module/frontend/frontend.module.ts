import { Module } from '@nestjs/common'
import { CertificateModule } from './certificate/certificate.module'

@Module({
    imports: [CertificateModule],
})
export class FrontendModule {}
