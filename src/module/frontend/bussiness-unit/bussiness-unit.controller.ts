import { Controller, Get, Param } from '@nestjs/common'
import { BBussinessUnitService } from '@module-back/b-bussiness-unit'

@Controller('bussiness-unit')
export class BussinessUnitController {
    constructor(private readonly bussinessUnitService: BBussinessUnitService) {}
    /**
     * 根据用户id获取业务单元一览
     */
    @Get('/:userId')
    bUnitByUserId(@Param('userId') userId: string) {
        return this.bussinessUnitService.getBUnitByUserId(userId)
    }
}