import { Injectable, Scope, Inject } from '@nestjs/common'
import { TokenDataDto } from '@module-back/back-dto/TokenDataDto'
import { TokenDataPageableDto } from '@module-back/back-dto/TokenDataPageableDto'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import { ZAxios } from '@hinata_hyuga/z-axios'
import { IBackendReqConfig, getBackendReqIns } from '@z-axios/back-axios'

@Injectable({ scope: Scope.REQUEST })
export class BackBaseApi {
    private readonly reqIns: ZAxios<IBackendReqConfig>
    constructor(@Inject(REQUEST) private readonly request: Request) {
        this.reqIns = getBackendReqIns(this.request)
    }

    /** 取得meta详细数据 */
    getMetaInfoByMetaIdAndTokenId(metaId: string, tokenId: string) {
        return this.reqIns
            .setUrl(`/base/metaId/tokenId`)
            .setQueryObj({
                metaId,
                tokenId,
            })
            .get<TokenDataDto>()
    }

    /** 根据fkey查询常量 */
    getConstant(fkey: string) {
        return this.reqIns.setUrl(`/base/constant/${fkey}`).get<string>()
    }

    /** 取得 meta 一览数据 */
    getMetaListData(metaId: string, pageNo: number, pageSize: number) {
        return this.reqIns
            .setUrl(`/base/metaId`)
            .setQueryObj({
                metaId,
                pageNo,
                pageSize,
            })
            .get<TokenDataPageableDto>()
    }
}
