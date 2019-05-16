import {
    Controller,
    Get,
    Param,
    Query,
    UseGuards,
    UseInterceptors,
    Post,
    Body,
    BadRequestException,
    Put,
} from '@nestjs/common'
import { BillService } from './bill.service'
import { OAuthInterceptor } from '@interceptor/oauth.interceptor'
import { AuthGuard } from '@nestjs/passport'

@Controller('bill')
export class BillController {
    constructor(private readonly billService: BillService) {}

    /**
     * 获取表单页面定义与数据 表头：定义 + 数据、 分录：定义、 关联单据：定义
     */
    @Get('/page/:bUnitId/:metaId/:tokenId')
    getBillPageByMetaIdAndTokenId(
        @Param('bUnitId') bUnitId: string,
        @Param('metaId') metaId: string,
        @Param('tokenId') tokenId: string,
    ) {
        return this.billService.getViewPage(bUnitId, metaId, tokenId)
    }

    /**
     * 新建表单页面 表头： 定义 + 数据、 分录：定义
     */
    @Get('/page/:bUnitId/:metaId')
    createBillPage(@Param('bUnitId') bUnitId: string, @Param('metaId') metaId: string) {
        return this.billService.getAddPage(bUnitId, metaId)
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

    /** 获取 select 类型 table 定义 */
    @Get('/select/columns/:metaId')
    getSelectTableColumns(@Param('metaId') metaId: string) {
        return this.billService.getSelectTableColumns(metaId)
    }

    /** 获取 select 类型 table 数据 */
    @Get('/select/data/:metaId')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(OAuthInterceptor)
    getSelectTableData(
        @Param('metaId') metaId: string,
        @Query('pageNo') pageNo: number = 1,
        @Query('pageSize') pageSize: number = 10,
    ) {
        return this.billService.getSelectTableData(metaId, pageNo, pageSize)
    }

    /** 保存表头数据 */
    @Post('/save/:metaId/:tokenId')
    saveBill(@Param('metaId') metaId: string, @Param('tokenId') tokenId: string, @Body() fromData) {
        if (!fromData) {
            throw new BadRequestException('shoud have formData')
        }
        return this.billService.saveBill(metaId, tokenId, fromData)
    }

    /** 提交表头数据 */
    @Post('/submit/:bUnitId/:metaId/:tokenId')
    submitBill(
        @Param('bUnitId') bUnitId: string,
        @Param('metaId') metaId: string,
        @Param('tokenId') tokenId: string,
        @Body() fromData,
    ) {
        if (!fromData) {
            throw new BadRequestException('shoud have formData')
        }
        return this.billService.submitBill(bUnitId, metaId, tokenId, fromData)
    }

    /** 下推 */
    // TODO: 等待更改
    @Put('/push-down/:bUnitId/:preMetaId/:preTokenId/:metaId')
    pushDown(
        @Param('bUnitId') bUnitId: string,
        @Param('preMetaId') preMetaId: string,
        @Param('preTokenId') preTokenId: string,
        @Param('metaId') metaId: string,
    ) {
        return this.billService.pushDown(bUnitId, preMetaId, preTokenId, metaId)
    }

    /** 获取分录数据 */
    @Get('/entry/:billMetaId/:billTokenId/:entryMetaId')
    getEntryData(
        @Param('billMetaId') billMetaId: string,
        @Param('billTokenId') billTokenId: string,
        @Param('entryMetaId') entryMetaId: string,
    ) {
        return this.billService.getEntryData(billMetaId, billTokenId, entryMetaId)
    }

    /** 新增分录 */
    @Put('/entry/:billMetaId/:billTokenId/:entryMetaId')
    createEntry(
        @Param('billMetaId') billMetaId: string,
        @Param('billTokenId') billTokenId: string,
        @Param('entryMetaId') entryMetaId: string,
    ) {
        return this.billService.createEntry(billMetaId, billTokenId, entryMetaId)
    }

    /** 获取分录 from 定义 + 数据 */
    @Get('/entry/:entryMetaId/:entryTokenId')
    getEntryViewPage(
        @Param('entryMetaId') entryMetaId: string,
        @Param('entryTokenId') entryTokenId: string,
    ) {
        return this.billService.getEntryViewPage(entryMetaId, entryTokenId)
    }

    /** 保存分录 */
    @Post('/entry/:billMetaId/:billTokenId/:entryMetaId/:entryTokenId')
    saveEntry(
        @Param('billMetaId') billMetaId: string,
        @Param('billTokenId') billTokenId: string,
        @Param('entryMetaId') entryMetaId: string,
        @Param('entryTokenId') entryTokenId: string,
        @Body() formData,
    ) {
        return this.billService.saveEntry(
            billMetaId,
            billTokenId,
            entryMetaId,
            entryTokenId,
            formData,
        )
    }
}
