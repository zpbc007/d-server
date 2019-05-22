import { Injectable, Scope, Inject } from '@nestjs/common'
import { MetaInfoDTO } from '@module-back/back-dto/MetaInfoDTO'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import { ZAxios } from '@hinata_hyuga/z-axios'
import { IBackendReqConfig, getBackendReqIns } from '@z-axios/back-axios'

@Injectable({ scope: Scope.REQUEST })
export class BackMetaApi {
    private readonly reqIns: ZAxios<IBackendReqConfig>
    constructor(@Inject(REQUEST) private readonly request: Request) {
        this.reqIns = getBackendReqIns(this.request)
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
