export interface MetaInfoDTO {
    metaId: string
    tokenMetaName: string
    key: string
    caption: string // 显示字段
    fkeytype: string // fkey对应的数据的类型（包含select）
    visible: boolean // 是否可见
    readOnly: boolean // 是否只读
    required: boolean // 是否必填
    metaName: string // 关联meta的meta名
    fKey: string // 关联的key
    metaKey: string // 关联meta的ID
    order_: string // 顺序
}
