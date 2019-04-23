import { Injectable } from '@nestjs/common'
import { ServerConfig } from '@config/server'
import { cache } from '@utils/cache'
import { ZAxios, addQuery } from '@hinata_hyuga/z-axios'
import { AxiosRequestConfig } from 'axios'

const ACCESSTOKENKEY = 'AccessTokenKey'

interface RequestConfig extends AxiosRequestConfig {
    skipAccessToken: boolean
}

@Injectable()
export class ClientService extends ZAxios<RequestConfig> {
    constructor() {
        super({
            newIns: true,
            insConfig: {
                baseURL: ServerConfig.dd.url,
            },
        })
        super.addReqInterceptor(this.addAccessToken, null)
        super.addReqInterceptor(this.addHeaderToPost, null)
    }

    /** 缓存 */
    private readonly cache = cache

    /** 为请求添加access token */
    private addAccessToken = async (config: RequestConfig) => {
        let { url } = config

        if (config.skipAccessToken) {
            return config
        }
        const accessToken = await this.getAccessToken()
        url = addQuery(url, {
            access_token: accessToken,
        })

        return {
            ...config,
            url,
        }
    }

    private addHeaderToPost = (config: RequestConfig) => {
        const { method, headers } = config

        if (method !== 'post') {
            return config
        }

        config = {
            ...config,
            headers: {
                ...headers,
                'Content-Type': 'application/json',
            },
        }

        return config
    }

    /** 获取access_token */
    private async getAccessToken() {
        let accessToken = this.cache.get(ACCESSTOKENKEY)

        if (accessToken) {
            return accessToken
        }

        const { access_token } = await this.fetchAccessToken()
        accessToken = access_token
        this.cache.set(ACCESSTOKENKEY, accessToken, ServerConfig.dd.tokenExpireTime - 1000)

        return accessToken
    }

    private fetchAccessToken() {
        return super
            .setUrl('gettoken')
            .setQueryObj({
                appkey: ServerConfig.dd.appkey,
                appsecret: ServerConfig.dd.appsecret,
            })
            .setConfig({
                skipAccessToken: true,
            })
            .get()
    }
}
