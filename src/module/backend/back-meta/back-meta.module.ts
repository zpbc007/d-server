import { Module } from '@nestjs/common'
import { BackMetaService } from './back-meta.service'
import { BackMetaApi } from './back-meta.api'
import { BackBaseModule, BackBaseService } from '@module-back/back-base'

@Module({
    imports: [BackBaseModule],
    providers: [BackBaseService, BackMetaApi, BackMetaService],
    exports: [BackMetaApi, BackMetaService],
})
export class BackMetaModule {}
