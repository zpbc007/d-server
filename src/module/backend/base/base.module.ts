import { Module } from '@nestjs/common'
import { BaseApi } from './base.api'
import { BaseService } from './base.service'

@Module({
    providers: [BaseApi, BaseService],
    exports: [BaseApi, BaseService],
})
export class BaseModule {}
