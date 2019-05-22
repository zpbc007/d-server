import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { FrontAuthModule } from '../front-auth/auth.module'
import { FrontAuthService } from '../front-auth/auth.service'
import { BackOauthModule } from '@module-back/back-oauth'

@Module({
    imports: [FrontAuthModule, BackOauthModule],
    providers: [FrontAuthService, UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
