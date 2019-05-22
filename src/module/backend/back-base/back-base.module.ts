import { Module } from '@nestjs/common'
import { BackBaseApi } from './back-base.api'
import { BackBaseService } from './back-base.service'

@Module({
    providers: [BackBaseApi, BackBaseService],
    exports: [BackBaseApi, BackBaseService],
})
export class BackBaseModule {}
