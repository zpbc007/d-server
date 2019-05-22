import { Module } from '@nestjs/common'
import { BackOAuthApi } from './back-oauth.api'

@Module({
    providers: [BackOAuthApi],
    exports: [BackOAuthApi],
})
export class BackOauthModule {}
