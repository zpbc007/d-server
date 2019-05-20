import { MetaInfoDTO } from '@module-back/dto/MetaInfoDTO'
import { FkeyField } from '@module-back/dto/TokenDataDto'
import { IFormItem, IFormSchema, IVerifyConfig } from '@type-comp/form-schema'
import { MetaService } from '@module-back/meta'

interface ITransFormFieldResult {
    config: IFormItem
    verify?: IVerifyConfig
    key: string
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
    [key in FkeyField['dataType'] | '_DEFAULT']?: (
        info: MetaInfoDTO,
        service: MetaService,
    ) => ITransFormResult
} = {
    STRING: ({ required, readOnly, caption, key }) => {
        return {
            config: {
                ...getBaseConfig(caption, readOnly),
                ui_widget: 'input',
            },
            verify: {
                ...getBaseVerify(required),
                ui_type: 'string',
            },
            key,
        }
    },
    DATE: ({ required, readOnly, caption, key }) => {
        return {
            config: {
                ...getBaseConfig(caption, readOnly),
                ui_widget: 'date_picker',
            },
            verify: {
                ...getBaseVerify(required),
                ui_type: 'date',
            },
            key,
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
                key,
            })
        })
    },
    SELECT: ({ caption, required, readOnly, metaKey, key }) => {
        return {
            config: {
                ...getBaseConfig(caption, readOnly),
                ui_widget: 'input_drawer',
                ui_metaId: metaKey,
            },
            verify: {
                ...getBaseVerify(required),
                ui_type: 'select',
            },
            key,
        }
    },
    SELECT_INTERN: ({ caption, key }) => {
        return {
            config: {
                ...getBaseConfig(caption, true),
                ui_widget: 'input',
            },
            key,
        }
    },
    BOOLEAN: ({ required, readOnly, caption, key }) => {
        return {
            config: {
                ...getBaseConfig(caption, readOnly),
                ui_widget: 'checkbox',
            },
            verify: {
                ...getBaseVerify(required),
                ui_type: 'boolean',
            },
            key,
        }
    },
    _DEFAULT: ({ required, readOnly, caption, key }) => {
        return {
            config: {
                ...getBaseConfig(caption, readOnly),
                ui_widget: 'input',
            },
            verify: {
                ...getBaseVerify(required),
                ui_type: 'string',
            },
            key,
        }
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
    const fieldGroupMap: {
        [groupName: string]: { mainKey?: string; relMap: { [key: string]: string } }
    } = {}
    // 转换promise
    const pros: ITransFormResult[] = []

    for (const fieldInfo of metaInfoDtoArr) {
        // 过滤隐藏字段并转换
        const { visible, key, fkeytype, metaName, fkey } = fieldInfo
        if (visible) {
            fieldsOrder.push(key)
            pros.push((transformMap[fkeytype] || transformMap._DEFAULT)(fieldInfo, metaService))
        }

        if (metaName) {
            // 生成 relationSchema 中间结构
            if (!fieldGroupMap[metaName]) {
                fieldGroupMap[metaName] = {
                    relMap: {},
                }
            }
            if (fkeytype === 'SELECT') {
                fieldGroupMap[metaName].mainKey = key
            }
            fieldGroupMap[metaName].relMap[key] = fkey
        }
    }

    // 等待所有转换完毕
    const transFormresult = await Promise.all(pros)
    transFormresult.forEach(({ config, verify, key }, index) => {
        fieldsConfig[key] = config
        if (verify) {
            verifySchema[key] = verify
        }
    })

    return {
        ui_verifySchema: verifySchema,
        ui_relationSchema: Object.keys(fieldGroupMap).reduce(
            (result, groupName) => {
                const { mainKey, relMap } = fieldGroupMap[groupName]
                return {
                    ...result,
                    [mainKey]: relMap,
                }
            },
            {} as IFormSchema['ui_relationSchema'],
        ),
        fieldsConfig,
        fieldsOrder,
    }
}
