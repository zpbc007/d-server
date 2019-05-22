import { ServerConfig } from '@config/server'
import { AxiosException } from '@exception-filter/axios.exception'
import { JwtPayload } from '@module-front/front-auth/jwt-payload.interface'
import { URL } from 'url'
import { getReqIns } from './z-axios'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Request } from 'express'
const { host, port } = ServerConfig.backend

export interface IBackendReqConfig extends AxiosRequestConfig {
    /** 返回的是否为同一返回结构 */
    withResult?: boolean
    request?: Request
}

interface IResult {
    msg: string
    resultCode: number
    data: any
}

/** 用于请求后端 api */
export function getBackendReqIns(request: Request) {
    const reqIns = getReqIns<IBackendReqConfig>(`http://${host}:${port}/`)

    reqIns.addReqInterceptor((config) => {
        if (config.request && config.request.user) {
            const { access_token }: JwtPayload = config.request.user
            const urlObj = new URL(config.url, config.baseURL)
            urlObj.searchParams.set('access_token', access_token)
            config.url = `${urlObj.pathname}${urlObj.search}`
        }

        return config
    })

    reqIns.addResInterceptor(
        (res: AxiosResponse<IResult>) => {
            const { withResult } = res.config as IBackendReqConfig

            // 不是同一返回结构 不做处理
            if (withResult === false) {
                return res
            }

            const { resultCode, msg, data } = res.data
            if (resultCode === 0) {
                return {
                    ...res,
                    data,
                }
            }

            return Promise.reject(
                new AxiosException({
                    config: res.config,
                    response: res,
                    name: `backend error, resultCode: ${resultCode}`,
                    message: msg,
                }),
            )
        },
        (error) => {
            throw new AxiosException(error)
        },
    )

    if (request) {
        reqIns.setConfig({
            request,
        })
    }

    return reqIns
}
