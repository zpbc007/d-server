import { Controller, Get, Post, Body, UnauthorizedException } from '@nestjs/common'
import { UserService } from './user.service'
import { AuthService } from '../auth/auth.service'
import { OAuthApi } from '@module-back/oauth/oauth.api'
import { UserInfoDto } from './dto/user-info.dto'

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly oAuthApi: OAuthApi,
    ) {}

    /** 获取当前用户信息 */
    @Get()
    userInfo() {
        return this.userService.getUserInfo()
    }

    @Post('login')
    async login(@Body() user: UserInfoDto) {
        try {
            const {
                refresh_token,
                access_token,
                user_id,
                roles,
            } = await this.oAuthApi.createAccessTokenByUserInfo(user.username, user.password)

            return this.authService.signIn({
                refresh_token,
                access_token,
                user_id,
                roles,
            })
        } catch (exception) {
            const {
                response: { response },
            } = exception as any

            if (response.status === 401) {
                throw new UnauthorizedException()
            } else {
                throw exception
            }
        }
    }
}
