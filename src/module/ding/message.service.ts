import { Injectable } from '@nestjs/common'
import { ClientService } from './client.service'
import { ServerConfig } from '@config/server'
import { IMsg, IMsgParam } from './message'

@Injectable()
export class MessageService {
    constructor(private readonly client: ClientService) {}

    /** 发送工作通知消息 */
    sendMsg(
        { userid_list = null, dept_id_list = null, to_all_user = false }: IMsgParam,
        msg: IMsg,
    ) {
        return this.client
            .setUrl('/topapi/message/corpconversation/asyncsend_v2')
            .setBody({
                agent_id: ServerConfig.dd.agentId,
                userid_list: userid_list && userid_list.join(','),
                dept_id_list: dept_id_list && dept_id_list.join(','),
                to_all_user,
                msg,
            })
            .post()
    }

    /** 查询工作通知消息的发送进度 */
    getMsgProgress(taskId: number) {
        return this.client
            .setUrl('/topapi/message/corpconversation/getsendprogress')
            .setBody({
                agent_id: ServerConfig.dd.agentId,
                task_id: taskId,
            })
            .post()
    }

    /** 查询工作通知消息的发送结果 */
    getMsgResult(taskId: number) {
        return this.client
            .setUrl('/topapi/message/corpconversation/getsendresult')
            .setBody({
                agent_id: ServerConfig.dd.agentId,
                task_id: taskId,
            })
            .post()
    }
}
