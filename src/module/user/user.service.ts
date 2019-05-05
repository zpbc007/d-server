import { Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
    getUserInfo() {
        return {
            /** 用户名 */
            userName: 'zhao peng',
            /** 头像 */
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            /** 权限 */
            authArr: ['0', '0-1'],
            /** 用户id */
            userId: 1,
        }
    }
}
