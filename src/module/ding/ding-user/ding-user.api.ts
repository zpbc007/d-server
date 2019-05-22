import { Injectable } from '@nestjs/common'
import { dingReqIns } from '@z-axios/ding-axios'
import { BaseUserInfo } from './dto/base-user-info'
import { DingBaseReturn } from '@module-ding/ding-common/ding-base-return'

@Injectable()
export class DingUserApi {
    /**
     * 获取用户id
     * @param code 免登授权码 前端提供
     */
    getBaseUserInfo(code: string) {
        return dingReqIns
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
        return dingReqIns
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
        return dingReqIns.setUrl('/user/get_admin').get()
    }
}
