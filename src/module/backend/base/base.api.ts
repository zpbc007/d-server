import { Injectable, Scope, Inject } from '@nestjs/common'
import { getReqIns, ICustomConfig } from '@utils/z-axios'
import { TokenDataDto } from '@module-back/dto/TokenDataDto'
import { TokenDataPageableDto } from '@module-back/dto/TokenDataPageableDto'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import { ZAxios } from '@hinata_hyuga/z-axios'

@Injectable({ scope: Scope.REQUEST })
export class BaseApi {
    private readonly reqIns: ZAxios<ICustomConfig>
    constructor(@Inject(REQUEST) private readonly request: Request) {
        this.reqIns = getReqIns(this.request)
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
