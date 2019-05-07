import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { AuthModule } from '../auth/auth.module'
import { AuthService } from '../auth/auth.service'
import { OauthModule } from '@module-back/oauth'

@Module({
    imports: [AuthModule, OauthModule],
    providers: [AuthService, UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
