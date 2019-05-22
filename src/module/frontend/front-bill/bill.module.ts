import { Module } from '@nestjs/common'
import { BillService } from './bill.service'
import { BillController } from './bill.controller'
import { BackBillModule, BackBillService, BackBillApi } from '@module-back/back-bill'
import { BackMetaModule, BackMetaService } from '@module-back/back-meta'
import { MergeSchemaModule, MergeSchemaService } from '@module-front/front-merge-schema'
import { BackBaseModule, BackBaseService } from '@module-back/back-base'
import { FrontAuthModule } from '@module-front/front-auth/auth.module'

@Module({
    imports: [FrontAuthModule, BackBaseModule, BackBillModule, BackMetaModule, MergeSchemaModule],
    providers: [
        BackBaseService,
        BillService,
        BackBillService,
        BackBillApi,
        BackMetaService,
        MergeSchemaService,
    ],
    controllers: [BillController],
})
export class BillModule {}
