import { Controller, Get, Param } from '@nestjs/common'
import { UserService } from './user/user.service'
import { LinkMsg } from './message/link'
import { MessageService } from './message.service'

@Controller('ding')
export class DingController {
    constructor(
        private readonly userService: UserService,
        private readonly messageService: MessageService,
    ) {}

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

    /** 测试信息发送 */
    @Get('/message/send')
    async sendMessage() {
        const { admin_list } = await this.userService.getAdmins()
        const msg = new LinkMsg({
            messageUrl: 'http://172.16.0.27:8888',
            picUrl: 'http://pic19.nipic.com/20120321/3001435_141555714185_2.jpg',
            title: '测试分享',
            text: '信息内容',
        })
        return this.messageService.sendMsg(
            {
                userid_list: [admin_list[0].userid],
            },
            msg,
        )
    }

    @Get('/message/progress/:taskId')
    getMsgProgress(@Param('taskId') taskId: number) {
        return this.messageService.getMsgProgress(taskId)
    }

    @Get('/message/result/:taskId')
    getMsgResult(@Param('taskId') taskId: number) {
        return this.messageService.getMsgResult(taskId)
    }
}
