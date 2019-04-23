import { Module } from '@nestjs/common'
import { ClientService } from './client.service'
import { DingController } from './ding.controller'
import { UserService } from './user/user.service'
import { DepartmentService } from './department.service'
import { MessageService } from './message.service'

@Module({
    providers: [ClientService, UserService, DepartmentService, MessageService],
    controllers: [DingController],
})
export class DingModule {}
