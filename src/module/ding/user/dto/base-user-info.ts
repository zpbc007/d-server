import { AdminRole } from '@module-ding/common/admin-role'

/** 免密登录时返回的基础用户信息 */
export interface BaseUserInfo {
    userid: string
    /** 管理员角色 */
    sys_level: AdminRole
    /** 是否为管理员 */
    is_sys: boolean
    deviceId: string
}
