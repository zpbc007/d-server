import { Module } from '@nestjs/common'
import { ClientService } from './client.service'
import { DingController } from './ding.controller'
import { UserService } from './user.service'
import { DepartmentService } from './department.service'

@Module({
    providers: [ClientService, UserService, DepartmentService],
    controllers: [DingController],
})
export class DingModule {}
