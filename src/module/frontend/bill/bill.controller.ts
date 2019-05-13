import { Controller, Get, Param, Query } from '@nestjs/common'
import { BillService } from './bill.service'

@Controller('bill')
export class BillController {
    constructor(private readonly billService: BillService) {}

    /** 获取表单页面定义与数据 */
    @Get('/page/:metaId/:tokenId')
    getBillPageByMetaIdAndTokenId(
        @Param('metaId') metaId: string,
        @Param('tokenId') tokenId: string,
    ) {
        return this.billService.getBillPageByMetaIdAndTokenId(metaId, tokenId)
    }

    /** 获取业务节点的关联meta */
    @Get('/rel-meta/:bUnitId')
    getRelMeta(@Param('bUnitId') bUnitId: string, @Query('metaId') metaId: string) {
        return this.billService.getRelMeta(bUnitId, metaId)
    }
}
