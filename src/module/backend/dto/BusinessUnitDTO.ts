export interface BusinessUnitDTO {
    businessUnitCode: string // 业务单元id
    businessUnitName: string // 业务单元名称
    billMetaId: string // 表头meta  项目式业务单元有，非项目式没有
    bpmnURL: string // bpmn图（配置用）
    exceptionId: string // 异常单ID
    description: string // 业务单元描述
    orgId: string // 组织架构id
}
