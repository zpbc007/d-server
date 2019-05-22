import { Injectable, Scope, Inject } from '@nestjs/common'
import { IBackendReqConfig, getBackendReqIns } from '@z-axios/back-axios'
import { ZAxios } from '@hinata_hyuga/z-axios'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import { OAuthDTO } from '@module-back/back-dto/OAuthDTO'

@Injectable({ scope: Scope.REQUEST })
export class BackUserApi {
    private readonly reqIns: ZAxios<IBackendReqConfig>
    constructor(@Inject(REQUEST) private readonly request: Request) {
        this.reqIns = getBackendReqIns(this.request)
    }

    /** 通过用户 id 获取 access token */
    generateAccessTokenByUserId(userId: string) {
        return this.reqIns
            .setUrl(`/user/token/${userId}`)
            .setConfig({
                withResult: false,
            })
            .get<OAuthDTO>()
    }
}
