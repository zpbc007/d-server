import { Module } from '@nestjs/common'
import { ClientService } from './client.service'
import { DingController } from './ding.controller'
import { UserService } from './user.service'

@Module({
    providers: [ClientService, UserService],
    controllers: [DingController],
})
export class DingModule {}
