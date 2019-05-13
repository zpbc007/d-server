import { MetaInfoDTO } from '@module-back/dto/MetaInfoDTO'
import { FkeyField } from '@module-back/dto/TokenDataDto'
import { IFormItem, IFormSchema, IVerifyConfig } from '@type-comp/form-schema'
import { MetaService } from '@module-back/meta'

interface ITransFormFieldResult {
    config: IFormItem
    verify: IVerifyConfig
}

type ITransFormResult = ITransFormFieldResult | Promise<ITransFormFieldResult>

const getBaseConfig = (caption: string, readOnly: boolean) => ({
    ui_disabled: readOnly,
    ui_title: caption,
})

const getBaseVerify = (required: boolean) => ({
    ui_required: required,
})

const transformMap: {
    [key in FkeyField['dataType'] | 'DEFAULT']?: (
        info: MetaInfoDTO,
        service: MetaService,
    ) => ITransFormResult
} = {
    STRING: ({ required, readOnly, caption }) => {
        return {
            config: {
                ...getBaseConfig(caption, readOnly),
                ui_widget: 'input',
            },
            verify: {
                ...getBaseVerify(required),
                ui_type: 'string',
            },
        }
    },
    DATE: ({ required, readOnly, caption }) => {
        return {
            config: {
                ...getBaseConfig(caption, readOnly),
                ui_widget: 'date_picker',
            },
            verify: {
                ...getBaseVerify(required),
                ui_type: 'date',
            },
        }
    },
    CONSTANT: ({ required, readOnly, caption, key }, service: MetaService) => {
        return new Promise(async (resolve) => {
            const options = await service.baseService.getConstant(key)

            resolve({
                config: {
                    ...getBaseConfig(caption, readOnly),
                    ui_widget: 'radio',
                    ui_options: options,
                },
                verify: {
                    ...getBaseVerify(required),
                    ui_type: 'string',
                },
            })
        })
    },
}

export async function MetaInfoDtoToFormSchema(
    metaInfoDtoArr: MetaInfoDTO[],
    metaService: MetaService,
) {
    // 字段顺序
    const fieldsOrder: string[] = []
    // 字段配置
    const fieldsConfig: { [key: string]: IFormItem } = {}
    // 字段校验schema
    const verifySchema: IFormSchema['ui_verifySchema'] = {}
    // 转换promise
    const pros: ITransFormResult[] = []

    // 过滤隐藏字段并转换
    for (const fieldInfo of metaInfoDtoArr) {
        const { visible, key, fkeytype } = fieldInfo
        if (visible) {
            fieldsOrder.push(key)
            pros.push(transformMap[fkeytype](fieldInfo, metaService))
        }
    }

    // 等待所有转换完毕
    const transFormresult = await Promise.all(pros)
    transFormresult.forEach(({ config, verify }, index) => {
        const { key } = metaInfoDtoArr[index]
        fieldsConfig[key] = config
        verifySchema[key] = verify
    })

    return {
        ui_verifySchema: verifySchema,
        fieldsConfig,
        fieldsOrder,
    }
}
