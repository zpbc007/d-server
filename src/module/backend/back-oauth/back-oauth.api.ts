import { Injectable, Scope, Inject } from '@nestjs/common'
import { ServerConfig } from '@config/server'
import { OAuthDTO } from '@module-back/back-dto/OAuthDTO'
import { REQUEST } from '@nestjs/core'
import { Request } from 'express'
import { ZAxios } from '@hinata_hyuga/z-axios'
import { IBackendReqConfig, getBackendReqIns } from '@z-axios/back-axios'
const {
    backend: { client_id, client_secret },
} = ServerConfig

@Injectable({ scope: Scope.REQUEST })
export class BackOAuthApi {
    private readonly reqIns: ZAxios<IBackendReqConfig>
    constructor(@Inject(REQUEST) private readonly request: Request) {
        this.reqIns = getBackendReqIns(this.request)
    }

    /**
     * 通过用户信息创建 access token
     */
    createAccessTokenByUserInfo(username: string, password: string) {
        return this.reqIns
            .setUrl('/oauth/token')
            .setQueryObj({
                username,
                password,
                grant_type: 'password',
                client_id,
                client_secret,
            })
            .setConfig({
                withResult: false,
            })
            .get<OAuthDTO>()
    }

    /**
     * 通过 refresh_token 创建 access_token
     */
    createAccessTokenByRefreshToken(refresh_token: string) {
        return this.reqIns
            .setUrl('/oauth/token')
            .setQueryObj({
                grant_type: 'refresh_token',
                client_id,
                client_secret,
                refresh_token,
            })
            .setConfig({
                withResult: false,
            })
            .get<OAuthDTO>()
    }
}
