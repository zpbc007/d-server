import { Module } from '@nestjs/common'
import { MetaService } from './meta.service'
import { MetaApi } from './meta.api'
import { BaseModule, BaseService } from '@module-back/base'

@Module({
    imports: [BaseModule],
    providers: [BaseService, MetaApi, MetaService],
    exports: [MetaApi, MetaService],
})
export class MetaModule {}
