import { Module } from '@nestjs/common'
import { OAuthApi } from './oauth.api'

@Module({
    providers: [OAuthApi],
    exports: [OAuthApi],
})
export class OauthModule {}
