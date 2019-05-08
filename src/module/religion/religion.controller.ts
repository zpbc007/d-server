import { Controller, Get, Post, Body, UnauthorizedException, UseGuards } from '@nestjs/common'
import { AuthData } from 'dectorators/AuthData'
import { UserInfoDto } from '@module-front/user/dto/user-info.dto'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from '@module-front/auth/auth.service'
import { JwtPayload } from '@module-front/auth/jwt-payload.interface'

@Controller('religion')
export class ReligionController {
    constructor(private readonly authService: AuthService) {}

    /** 登录 */
    @Post('login')
    login(@Body() { username, password }: UserInfoDto) {
        if (username === 'admin' && password === '123456') {
            return this.authService.signIn({ access_token: '1', refresh_token: '1' })
        }

        if (username === 'user' && password === '123456') {
            return this.authService.signIn({ access_token: '2', refresh_token: '2' })
        }

        throw new UnauthorizedException()
    }

    /** 获取用户信息 */
    @UseGuards(AuthGuard('jwt'))
    @Get('user')
    getUserInfo(@AuthData() user: JwtPayload) {
        if (user.access_token === '1') {
            return {
                /** 用户名 */
                userName: '管理员',
                /** 头像 */
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                /** 权限 */
                authArr: [],
                /** 用户id */
                userId: '1',
                /** 粉丝数量 */
                fansNum: 50,
                /** 关注数量 */
                followNum: 99,
            }
        }

        if (user.access_token === '2') {
            return {
                /** 用户名 */
                userName: '用户',
                /** 头像 */
                avatar:
                    'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
                /** 权限 */
                authArr: [],
                /** 用户id */
                userId: '2',
                /** 粉丝数量 */
                fansNum: 100,
                /** 关注数量 */
                followNum: 200,
            }
        }
    }
}
