import { Injectable, Scope, Inject } from '@nestjs/common'
import { ICustomConfig, getReqIns } from '@utils/z-axios'
import { MetaInfoDTO } from '@module-back/dto/MetaInfoDTO'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import { ZAxios } from '@hinata_hyuga/z-axios'

@Injectable({ scope: Scope.REQUEST })
export class MetaApi {
    private readonly reqIns: ZAxios<ICustomConfig>
    constructor(@Inject(REQUEST) private readonly request: Request) {
        this.reqIns = getReqIns(this.request)
    }
    /**
     * 根据metaId获取对应的meta信息
     */
    getMetaById(metaId: string) {
        return this.reqIns
            .setUrl(`/meta/findByMetaId`)
            .setQueryObj({
                metaId,
            })
            .get<MetaInfoDTO[]>()
    }
}
