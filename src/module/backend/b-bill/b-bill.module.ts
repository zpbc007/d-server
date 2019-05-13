import { Module } from '@nestjs/common'
import { BBillApi } from './b-bill.api'
import { BBillService } from './b-bill.service'

@Module({
    providers: [BBillApi, BBillService],
    exports: [BBillApi, BBillService],
})
export class BBillModule {}
