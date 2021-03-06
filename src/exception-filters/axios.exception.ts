import { HttpException, HttpStatus } from '@nestjs/common'
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { IBackendReqConfig } from '@z-axios/back-axios'

export interface AxiosExceptionRes {
    config: AxiosRequestConfig
    response: {
        data: any
        status: number
        statusText: string
    }
}

export class AxiosException extends HttpException {
    constructor({ config, response }: AxiosError) {
        const { data, status, statusText } = response || ({} as AxiosResponse)
        const { request, ...otherConfig } = config as IBackendReqConfig

        super(
            {
                config: otherConfig,
                response: {
                    data,
                    status,
                    statusText,
                },
                message: 'fetch data from backend server error',
            },
            HttpStatus.BAD_GATEWAY,
        )
    }
}
