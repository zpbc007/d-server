import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { DingUserController } from './user.controller'
import { ClientService } from '../client.service'

@Module({
    providers: [ClientService, UserService],
    controllers: [DingUserController],
})
export class DingUserModule {}
