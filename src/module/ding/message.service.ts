import { Injectable } from '@nestjs/common'
import { ServerConfig } from '@config/server'
import { IMsg, IMsgParam } from './ding-message'
import { dingReqIns } from '@z-axios/ding-axios'

@Injectable()
export class MessageService {
    /** 发送工作通知消息 */
    sendMsg(
        { userid_list = null, dept_id_list = null, to_all_user = false }: IMsgParam,
        msg: IMsg,
    ) {
        return dingReqIns
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
        return dingReqIns
            .setUrl('/topapi/message/corpconversation/getsendprogress')
            .setBody({
                agent_id: ServerConfig.dd.agentId,
                task_id: taskId,
            })
            .post()
    }

    /** 查询工作通知消息的发送结果 */
    getMsgResult(taskId: number) {
        return dingReqIns
            .setUrl('/topapi/message/corpconversation/getsendresult')
            .setBody({
                agent_id: ServerConfig.dd.agentId,
                task_id: taskId,
            })
            .post()
    }
}
