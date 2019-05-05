import { Controller, Get, Param } from '@nestjs/common'
import { BussinessUnitService } from './bussiness-unit.service'

@Controller('bussiness-unit')
export class BussinessUnitController {
    constructor(private readonly bussinessUnitService: BussinessUnitService) {}
    /**
     * 根据用户id获取业务单元一览
     */
    @Get('/:userId')
    bUnitByUserId(@Param('userId') userId: string) {
        return this.bussinessUnitService.getBUnitByUserId(userId)
    }
}
