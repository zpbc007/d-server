import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

/**
 * 部门关系表
 */
@Entity()
export class DeptMap {
    @PrimaryGeneratedColumn()
    id: number

    /**
     * 后端系统部门 id
     */
    @Column()
    deptId: string

    /**
     * 钉钉部门 id
     */
    @Column()
    dingtalkDeptId: string
}
