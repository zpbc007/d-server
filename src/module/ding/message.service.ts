import { Injectable, Logger } from '@nestjs/common'
import { ClientService } from './client.service'
import { IMsgParam, IMsg } from './message.interface'
import { ServerConfig } from '@config/server'

@Injectable()
export class MessageService {
    constructor(private readonly client: ClientService) {}

    /** 发送工作通知消息 */
    async sendMsg(
        { userid_list = null, dept_id_list = null, to_all_user = false }: IMsgParam,
        msg: IMsg,
    ) {
        const info = this.client
            .setUrl('/topapi/message/corpconversation/asyncsend_v2')
            .setBody({
                agent_id: ServerConfig.dd.agentId,
                userid_list,
                dept_id_list,
                to_all_user,
                msg,
            })
            .post()

        Logger.log(`msg: ${JSON.stringify(info)}`)
        return info
    }

    /** 查询工作通知消息的发送进度 */
    async getMsgProgress(taskId: number) {
        const status = await this.client
            .setUrl('/topapi/message/corpconversation/getsendprogress')
            .setBody({
                agent_id: ServerConfig.dd.agentId,
                task_id: taskId,
            })
            .post()

        Logger.log(`status: ${JSON.stringify(status)}`)
        return status
    }

    /** 查询工作通知消息的发送结果 */
    async getMsgResult(taskId: number) {
        const status = await this.client
            .setUrl('/topapi/message/corpconversation/getsendresult')
            .setBody({
                agent_id: ServerConfig.dd.agentId,
                task_id: taskId,
            })
            .post()

        Logger.log(`result: ${JSON.stringify(status)}`)
        return status
    }
}
