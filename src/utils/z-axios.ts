import { ZAxios } from '@hinata_hyuga/z-axios'
import { ServerConfig } from '@config/server'
import { AxiosResponse, AxiosRequestConfig } from 'axios'
import { AxiosException } from '@exception-filter/axios.exception'
import { Request } from 'express'
import { JwtPayload } from '@module-front/auth/jwt-payload.interface'
import { URL } from 'url'
const { host, port } = ServerConfig.backend

export interface ICustomConfig extends AxiosRequestConfig {
    /** 返回的是否为同一返回结构 */
    withResult?: boolean
    request?: Request
}

interface IResult {
    msg: string
    resultCode: number
    data: any
}

export function getReqIns(request: Request) {
    const reqIns = new ZAxios<ICustomConfig>({
        newIns: true,
        insConfig: {
            baseURL: `http://${host}:${port}/`,
        },
    })

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
            const { withResult } = res.config as ICustomConfig

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

            return Promise.reject(msg)
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
