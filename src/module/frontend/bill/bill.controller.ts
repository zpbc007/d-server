import { Controller, Get, Param, Query } from '@nestjs/common'
import { BillService } from './bill.service'

@Controller('bill')
export class BillController {
    constructor(private readonly billService: BillService) {}

    /** 获取表单页面定义与数据 */
    @Get('/page/:bUnitId/:metaId/:tokenId')
    getBillPageByMetaIdAndTokenId(
        @Param('bUnitId') bUnitId: string,
        @Param('metaId') metaId: string,
        @Param('tokenId') tokenId: string,
    ) {
        return this.billService.getBillPageByMetaIdAndTokenId(bUnitId, metaId, tokenId)
    }

    /** 获取业务节点的关联 meta 及其对应的 table 定义 */
    @Get('/rel-meta/:bUnitId')
    getRelMetaAndTableColumns(@Param('bUnitId') bUnitId: string, @Query('metaId') metaId: string) {
        return this.billService.getRelMetaAndTableColumns(bUnitId, metaId)
    }

    /** 获取业务节点的关联meta下的数据 */
    @Get('/rel-data/:bUnitId/:metaId')
    getRelData(
        @Param('bUnitId') bUnitId: string,
        @Param('metaId') metaId: string,
        @Query('preMetaId') preMetaId?: string,
        @Query('preTokenId') preTokenId?: string,
    ) {
        return this.billService.getRelData(bUnitId, metaId, preMetaId, preTokenId)
    }
}
