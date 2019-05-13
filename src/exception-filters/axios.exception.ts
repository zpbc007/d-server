import { HttpException, HttpStatus } from '@nestjs/common'
import { AxiosError, AxiosRequestConfig } from 'axios'

export interface AxiosExceptionRes {
    config: AxiosRequestConfig
    response: {
        data: any
        status: number
        statusText: string
    }
}

export class AxiosException extends HttpException {
    constructor({ config, response: { data, status, statusText } }: AxiosError) {
        super(
            {
                config,
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
