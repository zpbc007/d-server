import { Module } from '@nestjs/common'
import { BBussinessUnitService } from './b-bussiness-unit.service'

@Module({
    providers: [BBussinessUnitService],
    exports: [BBussinessUnitService],
})
export class BBussinessUnitModule {}
