import { Module } from '@nestjs/common'
import { BillService } from './bill.service'
import { BillController } from './bill.controller'
import { BBillModule, BBillService, BBillApi } from '@module-back/b-bill'
import { MetaModule, MetaService } from '@module-back/meta'
import { MergeSchemaModule, MergeSchemaService } from '@module-front/merge-schema'

@Module({
    imports: [BBillModule, MetaModule, MergeSchemaModule],
    providers: [BillService, BBillService, BBillApi, MetaService, MergeSchemaService],
    controllers: [BillController],
})
export class BillModule {}
