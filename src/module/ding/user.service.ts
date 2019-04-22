import { Injectable, Logger } from '@nestjs/common'
import { ClientService } from './client.service'

@Injectable()
export class UserService {
    constructor(private readonly client: ClientService) {}

    /**
     * 获取用户id
     * @param code 免登授权码 前端提供
     */
    async getUserId(code: string) {
        const info = await this.client
            .setUrl('/user/getuserinfo')
            .setQueryObj({
                code,
            })
            .get()
        Logger.log('user info: ', info)
        return info
    }
}
