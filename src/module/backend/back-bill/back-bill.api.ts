import { Injectable, Scope, Inject } from '@nestjs/common'
import { TokenDataDto } from '@module-back/back-dto/TokenDataDto'
import { TokenMetaInformationDto } from '@module-back/back-dto/TokenMetaInformationDto'
import { ZAxios } from '@hinata_hyuga/z-axios'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import { IBackendReqConfig, getBackendReqIns } from '@z-axios/back-axios'

@Injectable({ scope: Scope.REQUEST })
export class BackBillApi {
    private readonly reqIns: ZAxios<IBackendReqConfig>
    constructor(@Inject(REQUEST) private readonly request: Request) {
        this.reqIns = getBackendReqIns(this.request)
    }

    /** 新建表单 */
    createBill(bUnitId: string, metaId: string) {
        return this.reqIns
            .setUrl(`/bill/bill/business-unit-code/${bUnitId}/meta-id/${metaId}`)
            .put<TokenDataDto>()
    }

    /** 表单一览信息 */
    getBillToken(metaId: string, tokenId: string) {
        return this.reqIns
            .setUrl('/bill/bill/meta-id/token-id')
            .setQueryObj({
                metaId,
                tokenId,
            })
            .get<TokenDataDto>()
    }

    /** 业务节点关联的meta */
    getRelMeta(bUnitId: string, metaId?: string) {
        return this.reqIns
            .setUrl('/bill/getRelMeta')
            .setQueryObj({
                businessUnitCode: bUnitId,
                metaId,
            })
            .get<TokenMetaInformationDto[]>()
    }

    /** 获取业务节点的关联meta下的数据 */
    getRelData(bUnitId: string, metaId: string, preMetaId?: string, preTokenId?: string) {
        return this.reqIns
            .setUrl('/bill/getRelData')
            .setQueryObj({
                businessUnitCode: bUnitId,
                metaId,
                preMetaId,
                preTokenId,
            })
            .get<TokenDataDto[]>()
    }

    /** 获取业务单元可新增/下推meta */
    getPushDownMeta(bUnitId: string, metaId: string, tokenId: string) {
        return this.reqIns
            .setUrl('/bill/getPushDownMeta')
            .setQueryObj({
                businessUnitCode: bUnitId,
                metaId,
                tokenId,
            })
            .get<TokenMetaInformationDto[]>()
    }

    /** 获取表单分录meta */
    getEntryMeta(metaId: string) {
        return this.reqIns
            .setUrl('/bill/getEntryMeta')
            .setQueryObj({
                billMetaId: metaId,
            })
            .get<TokenMetaInformationDto[]>()
    }

    /** 获取分录数据 */
    getEntryData(billMetaId: string, billTokenId: string, entryMetaId: string) {
        return this.reqIns
            .setUrl('/bill/entry/bill-meta-id/bill-token-id/entry-meta-id')
            .setQueryObj({
                billMetaId,
                billTokenId,
                entryMetaId,
            })
            .get<TokenDataDto[]>()
    }

    /** 保存表头 */
    saveBill(metaId: string, dto: TokenDataDto) {
        return this.reqIns
            .setUrl('/bill/bill/meta-id')
            .setQueryObj({
                metaId,
            })
            .setBody(dto)
            .post()
    }

    /** 提交表头 */
    submitBill(bUnitId: string, metaId: string, dto: TokenDataDto) {
        return this.reqIns
            .setUrl('/bill/submit/meta-id')
            .setQueryObj({
                businessUnitCode: bUnitId,
                metaId,
            })
            .setBody(dto)
            .post()
    }

    /** 下推 */
    pushDown(bUnitId: string, preMetaId: string, preTokenId: string, metaId: string) {
        return this.reqIns
            .setUrl(`/bill/pushDown`)
            .setQueryObj({
                businessUnitCode: bUnitId,
                preMetaId,
                preTokenId,
                metaId,
            })
            .get<TokenDataDto>()
    }

    /** 新建分录 */
    createEntry(billMetaId: string, billTokenId: string, entryMetaId: string) {
        return this.reqIns
            .setUrl(`/bill/entry/bill-token-id/entry-meta-id`)
            .setQueryObj({
                billMetaId,
                billTokenId,
                entryMetaId,
            })
            .put<TokenDataDto>()
    }

    /** 保存分录 */
    saveEntry(billMetaId: string, billTokenId: string, entryMetaId: string, dto: TokenDataDto) {
        return this.reqIns
            .setUrl(`/bill/entry/bill-token-id/entry-meta-id`)
            .setQueryObj({
                entryMetaId,
                billTokenId,
                billMetaId,
            })
            .setBody(dto)
            .post()
    }
}
