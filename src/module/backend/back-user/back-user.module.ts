import { Module } from '@nestjs/common'
import { BackUserApi } from './back-user.api'

@Module({
    providers: [BackUserApi],
    exports: [BackUserApi],
})
export class BackUserModule {}
