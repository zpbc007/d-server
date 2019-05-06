import { Module } from '@nestjs/common'
import { MetaService } from './meta.service'
import { MetaApi } from './meta.api'

@Module({
    providers: [MetaApi, MetaService],
    exports: [MetaApi, MetaService],
})
export class MetaModule {}
