import { ZAxios } from '@hinata_hyuga/z-axios'
import { ServerConfig } from '@config/server'
import { AxiosResponse } from 'axios'
import { HttpException } from '@nestjs/common'
const { host, port } = ServerConfig.backend

const reqIns = new ZAxios({
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
