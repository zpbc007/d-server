import { Injectable, Logger } from '@nestjs/common'
import { ClientService } from './client.service'

@Injectable()
export class UserService {
    constructor(private readonly client: ClientService) {}

    /**
     * 获取用户id
     * @param code 免登授权码 前端提供
     */
    async getIdInfo(code: string) {
        const idInfo = await this.client
            .setUrl('/user/getuserinfo')
            .setQueryObj({
                code,
            })
            .get()
        Logger.log('user idInfo: ', JSON.stringify(idInfo))
        return idInfo
    }

    /**
     * 获取用户详情信息
     * @param id 用户id
     */
    async getDatail(id: string) {
        const detail = await this.client
            .setUrl('/user/get')
            .setQueryObj({
                userid: id,
            })
            .get()
        Logger.log('user detail: ', JSON.stringify(detail))
        return detail
    }

    /**
     * 获取管理员列表
     */
    async getAdmins() {
        const admins = await this.client.setUrl('/user/get_admin').get()

        Logger.log(`admins: ${JSON.stringify(admins)}`)
        return admins
    }
}
