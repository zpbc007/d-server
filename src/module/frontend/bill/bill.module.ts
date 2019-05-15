import { Module } from '@nestjs/common'
import { BillService } from './bill.service'
import { BillController } from './bill.controller'
import { BBillModule, BBillService, BBillApi } from '@module-back/b-bill'
import { MetaModule, MetaService } from '@module-back/meta'
import { MergeSchemaModule, MergeSchemaService } from '@module-front/merge-schema'
import { BaseModule, BaseService } from '@module-back/base'
import { AuthModule } from '@module-front/auth/auth.module'

@Module({
    imports: [AuthModule, BaseModule, BBillModule, MetaModule, MergeSchemaModule],
    providers: [BaseService, BillService, BBillService, BBillApi, MetaService, MergeSchemaService],
    controllers: [BillController],
})
export class BillModule {}
