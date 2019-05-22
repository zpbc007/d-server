import { Module } from '@nestjs/common'
import { FrontAuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ServerConfig } from '@config/server'
import { JwtStrategy } from './jwt.strategy'
import { BackOauthModule, BackOAuthApi } from '@module-back/back-oauth'
const {
    auth: { secret, expiresIn },
} = ServerConfig

@Module({
    imports: [
        BackOauthModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secretOrPrivateKey: secret,
            signOptions: {
                expiresIn,
            },
        }),
    ],
    providers: [PassportModule, FrontAuthService, JwtStrategy, BackOAuthApi],
    exports: [FrontAuthService],
})
export class FrontAuthModule {}
