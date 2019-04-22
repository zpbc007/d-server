import { Injectable, Logger } from '@nestjs/common'
import { ClientService } from './client.service'

/** 用户排序 */
enum UserOrderEnum {
    /** 代表按照进入部门的时间升序 */
    entry_asc = 'entry_asc',
    /** 代表按照进入部门的时间降序 */
    entry_desc = 'entry_desc',
    /** 代表按照部门信息修改时间升序 */
    modify_asc = 'modify_asc',
    /** 代表按照部门信息修改时间降序 */
    modify_desc = 'modify_desc',
    /** 代表用户定义(未定义时按照拼音)排序 */
    custom = 'custom',
}

@Injectable()
export class DepartmentService {
    constructor(private readonly client: ClientService) {}

    /**
     * 获取部门用户userid列表
     * @param deptId 部门id
     */
    async getUserIds(deptId: string) {
        const userIds = await this.client
            .setUrl('/user/getDeptMember')
            .setQueryObj({
                deptId,
            })
            .get()

        Logger.log(`dept user id list: ${JSON.stringify(userIds)}`)

        return userIds
    }

    /**
     * 获取部门用户
     * @param deptId 部门id
     * @param offset 偏移量
     * @param size 分页大小 最大100
     * @param order 排序
     */
    async getUsers(deptId: string, offset: number, size: number, order: UserOrderEnum) {
        const users = await this.client
            .setUrl('/user/simplelist')
            .setQueryObj({
                lang: 'zh_CN',
                department_id: deptId,
                offset,
                size,
                order,
            })
            .get()
        Logger.log(`dept users: ${JSON.stringify(users)}`)

        return users
    }

    /**
     * 获取部门用户详情
     * @param deptId 部门id
     * @param offset 偏移量
     * @param size 分页大小 最大100
     * @param order 排序
     */
    async getUsersDetail(deptId: string, offset: number, size: number, order: UserOrderEnum) {
        const users = await this.client
            .setUrl('/user/listbypage')
            .setQueryObj({
                lang: 'zh_CN',
                department_id: deptId,
                offset,
                size,
                order,
            })
            .get()
        Logger.log(`dept users detail: ${JSON.stringify(users)}`)

        return users
    }
}
