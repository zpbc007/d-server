import { Controller, Get } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    /** 获取当前用户信息 */
    @Get()
    userInfo() {
        return this.userService.getUserInfo()
    }
}
