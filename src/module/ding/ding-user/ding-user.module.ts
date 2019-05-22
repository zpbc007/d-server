import { Module } from '@nestjs/common'
import { DingUserService } from './ding-user.service'
import { DingUserController } from './ding-user.controller'
import { DingUserApi } from './ding-user.api'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserMap } from '@module-ding/ding-entity/user-map.entity'
import { BackUserModule, BackUserApi } from '@module-back/back-user'
import { FrontAuthModule } from '@module-front/front-auth/auth.module'
import { FrontAuthService } from '@module-front/front-auth/auth.service'

@Module({
    imports: [TypeOrmModule.forFeature([UserMap]), BackUserModule, FrontAuthModule],
    providers: [BackUserApi, FrontAuthService, DingUserApi, DingUserService],
    controllers: [DingUserController],
})
export class DingUserModule {}
