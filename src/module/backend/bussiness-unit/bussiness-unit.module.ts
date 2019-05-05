import { Module } from '@nestjs/common'
import { BussinessUnitController } from './bussiness-unit.controller'
import { BussinessUnitService } from './bussiness-unit.service'

@Module({
    controllers: [BussinessUnitController],
    providers: [BussinessUnitService],
})
export class BussinessUnitModule {}
