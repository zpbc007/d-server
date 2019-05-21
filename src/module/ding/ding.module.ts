import { Module } from '@nestjs/common'
import { ClientService } from './client.service'
import { DingController } from './ding.controller'
import { UserService } from './user/user.service'
import { DepartmentService } from './department.service'
import { MessageService } from './message.service'
import { DingUserModule } from './user/user.module'

@Module({
    imports: [DingUserModule],
    providers: [ClientService, UserService, DepartmentService, MessageService],
    controllers: [DingController],
})
export class DingModule {}
