import { getReqIns } from './z-axios'
import { ServerConfig } from '@config/server'
import { cache } from '@utils/cache'
import { AxiosRequestConfig } from 'axios'
import { addQuery } from '@hinata_hyuga/z-axios'

const ACCESSTOKENKEY = 'AccessTokenKey'

export interface IDingReqConfig extends AxiosRequestConfig {
    skipAccessToken: boolean
}

// 用于请求钉钉 api
const dingReqIns = getReqIns<IDingReqConfig>(ServerConfig.dd.url)

// 请求添加 accessToken
dingReqIns.addReqInterceptor(async (config: IDingReqConfig) => {
    let { url } = config

    if (config.skipAccessToken) {
        return config
    }
    const accessToken = await getAccessToken()
    url = addQuery(url, {
        access_token: accessToken,
    })

    return {
        ...config,
        url,
    }
})

// post 请求添加 header
dingReqIns.addReqInterceptor((config: IDingReqConfig) => {
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
})

/** 获取 access_token */
async function getAccessToken() {
    let accessToken = cache.get(ACCESSTOKENKEY)

    if (accessToken) {
        return accessToken
    }

    const { access_token } = await fetchAccessToken()
    accessToken = access_token
    cache.set(ACCESSTOKENKEY, accessToken, ServerConfig.dd.tokenExpireTime - 1000)

    return accessToken
}

// 请求钉钉服务，获取 access token
function fetchAccessToken() {
    return dingReqIns
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

export { dingReqIns }
