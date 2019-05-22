import { Module } from '@nestjs/common'
import { BackBillApi } from './back-bill.api'
import { BackBillService } from './back-bill.service'

@Module({
    providers: [BackBillApi, BackBillService],
    exports: [BackBillApi, BackBillService],
})
export class BackBillModule {}
