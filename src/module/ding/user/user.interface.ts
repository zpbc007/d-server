import { DingBaseReturn } from '../common/type'

/** 管理员角色 */
enum AdminRole {
    /** 主管理员 */
    root = 1,
    /** 子管理员 */
    child = 2,
}

interface AdminItem {
    sys_level: AdminRole
    userid: string
}

/** 管理员列表返回值 */
interface AdminListResult extends DingBaseReturn {
    admin_list: AdminItem[]
}

export { AdminRole, AdminListResult }
