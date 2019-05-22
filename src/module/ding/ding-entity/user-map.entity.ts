import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

/**
 * 部门关系表
 */
@Entity()
export class UserMap {
    @PrimaryGeneratedColumn()
    id: number

    /**
     * 后端系统用户 id
     */
    @Column()
    user_id: string

    /**
     * 钉钉用户 id
     */
    @Column()
    dingtalk_user_id: string
}
