import { Injectable } from '@nestjs/common'
import { IFormSchema, IFormItem } from '@type-comp/form-schema'

@Injectable()
export class MergeSchemaService {
    /** 生成默认form布局 */
    createDefaultFormSchema(
        {
            ui_verifySchema,
            fieldsOrder,
            fieldsConfig,
        }: {
            ui_verifySchema: IFormSchema['ui_verifySchema']
            fieldsConfig: { [key: string]: IFormItem }
            fieldsOrder: string[]
        },
        readonly = false,
    ) {
        return {
            ...fieldsConfig,
            ui_verifySchema,
            ui_readonly: readonly,
            ui_order: ['_default'],
            _default: {
                ui_title: '',
                ui_order: fieldsOrder,
            },
        } as IFormSchema
    }
}
