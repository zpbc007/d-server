import { Module } from '@nestjs/common'
import { BBussinessUnitModule, BBussinessUnitService } from '@module-back/b-bussiness-unit'
import { BussinessUnitController } from './bussiness-unit.controller'

@Module({
    imports: [BBussinessUnitModule],
    controllers: [BussinessUnitController],
    providers: [BBussinessUnitService],
})
export class BussinessUnitModule {}
