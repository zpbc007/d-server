import { Injectable } from '@nestjs/common'
import { IFormSchema, IFormItem } from '@type-comp/form-schema'

@Injectable()
export class MergeSchemaService {
    /** 生成默认form布局 */
    createDefaultFormSchema(
        {
            ui_verifySchema,
            ui_relationSchema,
            fieldsOrder,
            fieldsConfig,
        }: {
            ui_verifySchema: IFormSchema['ui_verifySchema']
            ui_relationSchema: IFormSchema['ui_relationSchema']
            fieldsConfig: { [key: string]: IFormItem }
            fieldsOrder: string[]
        },
        readonly = false,
    ) {
        return {
            ...fieldsConfig,
            ui_verifySchema,
            ui_relationSchema,
            ui_readonly: readonly,
            ui_order: ['_default'],
            _default: {
                ui_title: '',
                ui_order: fieldsOrder,
            },
        } as IFormSchema
    }

    /** 生成在 drawer 中的 form 布局 */
    createDrawerFormSchema(
        {
            ui_verifySchema,
            ui_relationSchema,
            fieldsOrder,
            fieldsConfig,
        }: {
            ui_verifySchema: IFormSchema['ui_verifySchema']
            ui_relationSchema: IFormSchema['ui_relationSchema']
            fieldsConfig: { [key: string]: IFormItem }
            fieldsOrder: string[]
        },
        readonly = false,
    ) {
        return {
            ...Object.keys(fieldsConfig).reduce(
                (result, key) => {
                    return {
                        ...result,
                        [key]: {
                            ...fieldsConfig[key],
                            ui_xxl: 12,
                            ui_xl: 12,
                            ui_lg: 12,
                            ui_md: 12,
                            ui_sm: 12,
                            ui_xs: 12,
                        } as IFormItem,
                    }
                },
                {} as any,
            ),
            ui_verifySchema,
            ui_relationSchema,
            ui_readonly: readonly,
            ui_order: ['_default'],
            _default: {
                ui_title: '',
                ui_order: fieldsOrder,
            },
        } as IFormSchema
    }
}
