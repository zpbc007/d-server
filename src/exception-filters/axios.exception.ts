import { HttpException, HttpStatus } from '@nestjs/common'
import { AxiosRequestConfig } from 'axios'

export class AxiosException extends HttpException {
    constructor(config: AxiosRequestConfig) {
        super(
            {
                config,
                message: 'fetch data from backend server error',
            },
            HttpStatus.BAD_GATEWAY,
        )
    }
}
