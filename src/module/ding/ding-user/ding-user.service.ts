import { Injectable } from '@nestjs/common'
import { DingUserApi } from './ding-user.api'
import { InjectRepository } from '@nestjs/typeorm'
import { UserMap } from '@module-ding/ding-entity/user-map.entity'
import { Repository } from 'typeorm'
import { BackUserApi } from '@module-back/back-user'
import { JwtPayload } from '@module-front/front-auth/jwt-payload.interface'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class DingUserService {
    constructor(
        private readonly userApi: DingUserApi,
        private readonly backUserApi: BackUserApi,
        private readonly jwtService: JwtService,
        @InjectRepository(UserMap)
        readonly userMapRepo: Repository<UserMap>,
    ) {}

    async signIn(payload: JwtPayload) {
        return this.jwtService.sign(payload)
    }

    /**
     * 通过前端免登授权码获取后端token
     */
    async createAccessTokenByCode(code: string) {
        // 获取钉钉用户 id
        const { userid: dingUserId } = await this.userApi.getBaseUserInfo(code)
        // TODO: 数据库中只有这个id
        // 将钉钉用户 id 转为后端用户 id
        const userId = await this.getSystemUserIdByDingUserId('0220135623679411' || dingUserId)
        if (!userId) {
            return null
        }
        // 通过 userId 获取后端 token
        return this.backUserApi.generateAccessTokenByUserId(userId)
    }

    /** 查询数据库，将钉钉用户 id 转为后端用户 id */
    private async getSystemUserIdByDingUserId(dingUserId: string) {
        const result = await this.userMapRepo.findOne({
            select: ['user_id'],
            where: { dingtalk_user_id: dingUserId },
        })

        return result && result.user_id
    }
}
