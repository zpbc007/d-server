import { Module } from '@nestjs/common'
import { BillApi } from './bill.api'
import { BillService } from './bill.service'

@Module({
    providers: [BillApi, BillService],
    exports: [BillApi, BillService],
})
export class BillModule {}
