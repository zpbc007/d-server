import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './jwt-payload.interface'

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    /** access_token + refresh_token => jwt_token */
    async signIn(payload: JwtPayload) {
        return this.jwtService.sign(payload)
    }

    /** 如果 jwt_token 中没有 access_token + refresh_token 则校验失败 */
    async validateUser(payload: JwtPayload) {
        if (!payload.access_token || !payload.refresh_token) {
            return null
        }

        return payload
    }
}
