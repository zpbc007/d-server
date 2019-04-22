import { Module } from '@nestjs/common'
import { DingModule } from './module/ding/ding.module'
import { DepartmentService } from './module/department/department.service'

@Module({
    imports: [DingModule],
    providers: [DepartmentService],
})
export class AppModule {}
