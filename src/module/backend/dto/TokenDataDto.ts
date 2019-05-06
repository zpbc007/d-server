export type FieldDataType =
    | 'STRING'
    | 'DATE'
    | 'SELECT' // 主动选择
    | 'SELECT_INTERN' // 被选择的字段
    | 'DECIMAL'
    | 'FILE'
    | 'INTEGER'
    | 'CODE'
    | 'IMAGE'
    | 'BOOLEAN'
    | 'MEMO'
    | 'CONSTANT'
    | 'MULTI_CONSTANT'

export interface FkeyField {
    /**
     * 1、日期、数量、金额、备注等用户手填/手选字段
     * 2、辅助资料(客户、供应商、业务类别、会计科目、业务组织)，用内码区分
     * 3、带序列号或者批号的BO，用序列号或者批号区分
     * 4、表单，用批号区分
     */
    fieldDomainType?: string

    dataType: FieldDataType
    key: string
    MetaFieldType?: string

    /**
     * 每个字段的特定值。
     * 当MetaFieldType为com.footprint.common.enums.FkeyTypeEnum#SelectType时
     * save的时候使用businessId和jsonData
     * retrieve的时候把businessId和jsonData直接取出
     * 当MetaFieldType为com.footprint.common.enums.FkeyTypeEnum#SelectInternType时
     * save的时候不存
     * 取得时候根据com.footprint.model.meta.property.RalValue#fkey找到businessId，然后根据com.footprint.model.meta.property.RalValue#metaKey取得数据
     */
    businessId?: string
    jsonData: string // JSON数据
}

export interface TokenDataDto {
    tokenId: string
    fields: FkeyField[]
}
