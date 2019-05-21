import { Controller, Get, Param } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('ding-user')
export class DingUserController {
    constructor(private readonly userService: UserService) {}

    /** 通过前端提供的免登授权码获取用户信息 */
    @Get('/userid/:code')
    getUserId(@Param('code') code: string) {
        return this.userService.getIdInfo(code)
    }

    @Get('/user/:id')
    getUserInfo(@Param('id') id: string) {
        return this.userService.getDatail(id)
    }

    @Get('/user/admin/list')
    getAdmins() {
        return this.userService.getAdmins()
    }
}
