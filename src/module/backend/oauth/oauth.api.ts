import { Injectable } from '@nestjs/common'
import reqIns from '@utils/z-axios'
import { ServerConfig } from '@config/server'
import { OAuthDTO } from '@module-back/dto/OAuthDTO'
const {
    backend: { client_id, client_secret },
} = ServerConfig

@Injectable()
export class OAuthApi {
    /**
     * 通过用户信息创建 access token
     */
    createAccessTokenByUserInfo(username: string, password: string) {
        return reqIns
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
        return reqIns
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
