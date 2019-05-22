import { TextMsg } from './text'
import { ImageMsg } from './image'
import { VoiceMsg } from './voice'
import { FileMsg } from './file'
import { LinkMsg } from './link'
import { OaMsg } from './oa'

export type IMsg = TextMsg | ImageMsg | VoiceMsg | FileMsg | LinkMsg | OaMsg
export interface IMsgParam {
    /** 接收者的用户userid列表，最大列表长度：100 */
    userid_list?: string[]
    /** 接收者的部门id列表，最大列表长度：20,  接收者是部门id下(包括子部门下)的所有用户 */
    dept_id_list?: string[]
    /** 是否发送给企业全部用户 */
    to_all_user?: boolean
}

export { TextMsg, ImageMsg, VoiceMsg, FileMsg, OaMsg }
