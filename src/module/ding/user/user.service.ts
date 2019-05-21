import { Injectable } from '@nestjs/common'
import { ClientService } from '../client.service'
import { DingBaseReturn } from '@module-ding/common/ding-base-return'
import { BaseUserInfo } from './dto/base-user-info'

@Injectable()
export class UserService {
    constructor(private readonly client: ClientService) {}

    /**
     * 获取用户id
     * @param code 免登授权码 前端提供
     */
    getIdInfo(code: string) {
        return this.client
            .setUrl('/user/getuserinfo')
            .setQueryObj({
                code,
            })
            .get<BaseUserInfo & DingBaseReturn>()
    }

    /**
     * 获取用户详情信息
     * @param id 用户id
     */
    getDatail(id: string) {
        return this.client
            .setUrl('/user/get')
            .setQueryObj({
                userid: id,
            })
            .get()
    }

    /**
     * 获取管理员列表
     */
    async getAdmins() {
        return this.client.setUrl('/user/get_admin').get()
    }
}
