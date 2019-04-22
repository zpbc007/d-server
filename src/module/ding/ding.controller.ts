import { Controller, Get, Param } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('ding')
export class DingController {
    constructor(private readonly userService: UserService) {}

    @Get('/userid/:code')
    getUserId(@Param('code') code: string) {
        return this.userService.getUserId(code)
    }
}
