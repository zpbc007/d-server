import { ZAxios } from '@hinata_hyuga/z-axios'
import { ServerConfig } from '@config/server'
import { AxiosResponse, AxiosRequestConfig } from 'axios'
import { HttpException } from '@nestjs/common'
const { host, port } = ServerConfig.backend

interface ICustomConfig extends AxiosRequestConfig {
    /** 返回的是否为同一返回结构 */
    withResult?: boolean
}

const reqIns = new ZAxios<ICustomConfig>({
    newIns: true,
    insConfig: {
        baseURL: `http://${host}:${port}/`,
    },
})

interface IResult {
    msg: string
    resultCode: number
    data: any
}

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
        return Promise.reject(
            new HttpException({ message: error.message, config: error.config }, error.code as any),
        )
    },
)

export default reqIns
