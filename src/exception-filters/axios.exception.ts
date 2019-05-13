import { HttpException, HttpStatus } from '@nestjs/common'
import { AxiosError } from 'axios'

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
