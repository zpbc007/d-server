import { Module } from '@nestjs/common'
import { CertificateModule } from './certificate/certificate.module'
import { BussinessUnitModule } from './bussiness-unit/bussiness-unit.module'

@Module({
    imports: [BussinessUnitModule, CertificateModule],
})
export class BackendModule {}
