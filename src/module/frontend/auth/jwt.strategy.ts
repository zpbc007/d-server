import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { AuthService } from './auth.service'
import { ServerConfig } from '@config/server'
import { JwtPayload } from './jwt-payload.interface'
const {
    auth: { secret },
} = ServerConfig

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: secret,
        })
    }

    async validate(payload: JwtPayload) {
        const token = this.authService.validateUser(payload)
        if (!token) {
            throw new UnauthorizedException()
        }

        return token
    }
}
