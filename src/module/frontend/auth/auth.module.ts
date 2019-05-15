import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ServerConfig } from '@config/server'
import { JwtStrategy } from './jwt.strategy'
import { OauthModule, OAuthApi } from '@module-back/oauth'
const {
    auth: { secret, expiresIn },
} = ServerConfig

@Module({
    imports: [
        OauthModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secretOrPrivateKey: secret,
            signOptions: {
                expiresIn,
            },
        }),
    ],
    providers: [PassportModule, AuthService, JwtStrategy, OAuthApi],
    exports: [AuthService],
})
export class AuthModule {}
