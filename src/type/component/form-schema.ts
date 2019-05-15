export interface IRelationSchema {
    [key: string]: {
        [key: string]: any
    }
}

interface IGroup {
    ui_title?: string
    ui_order: string[]
}

export interface IVerifySchema {
    ui_type: 'array' | 'boolean' | 'date' | 'integer' | 'number' | 'select' | 'string'
}

export interface IArrayConfig {
    ui_required?: boolean
    ui_max?: number
    ui_min?: number
}

export interface IBooleanConfig {
    ui_required?: boolean
}

export interface IDateConfig {
    ui_required?: boolean
}

export interface IIntegerConfig {
    ui_required?: boolean
    ui_max?: number
    ui_min?: number
}

export interface INumberConfig {
    ui_required?: boolean
    ui_max?: number
    ui_min?: number
}

export interface IStringConfig {
    ui_required?: boolean
    ui_max?: number
    ui_min?: number
}

type IValidateConfig =
    | IArrayConfig
    | IBooleanConfig
    | IDateConfig
    | IIntegerConfig
    | INumberConfig
    | IStringConfig

type WidgetType =
    | 'checkbox'
    | 'date_picker'
    | 'input'
    | 'input_drawer'
    | 'input_number'
    | 'radio'
    | 'select'
    | 'textarea'
    | 'upload'

export type IVerifyConfig = IVerifySchema & IValidateConfig

export interface IFormItem {
    ui_title: string
    ui_disabled: boolean
    ui_widget: WidgetType
    ui_xsOffset?: number
    ui_smOffset?: number
    ui_mdOffset?: number
    ui_lgOffset?: number
    ui_xs?: number
    ui_sm?: number
    ui_md?: number
    ui_lg?: number
}

export interface IFormSchema {
    ui_title?: string
    ui_readonly?: boolean
    ui_order: string[]
    ui_relationSchema?: IRelationSchema
    ui_verifySchema: { [key: string]: IVerifyConfig }
    [key: string]: IGroup | IFormItem | any
}
