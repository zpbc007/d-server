import { Module } from '@nestjs/common'
import { MergeSchemaService } from './merge-schema.service'

@Module({
    providers: [MergeSchemaService],
    exports: [MergeSchemaService],
})
export class MergeSchemaModule {}
