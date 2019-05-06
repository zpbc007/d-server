import { Injectable } from '@nestjs/common'
import { MetaApi } from './meta.api'
import { IColumn } from '@type-comp/table-schema'
import { FkeyField } from '@module-back/dto/TokenDataDto'
import { IFormItem, IFormSchema, IVerifyConfig } from '@type-comp/form-schema'
import { MetaInfoDTO } from '@module-back/dto/MetaInfoDTO'
import { BaseService } from '@module-back/base'

const getBaseConfig = (caption: string, readOnly: boolean) => ({
    ui_disabled: readOnly,
    ui_title: caption,
})

const getBaseVerify = (required: boolean) => ({
    ui_required: required,
})

interface ITransFormFieldResult {
    config: IFormItem
    verify: IVerifyConfig
}

type ITransFormResult = ITransFormFieldResult | Promise<ITransFormFieldResult>

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

@Injectable()
export class MetaService {
    constructor(private readonly metaApi: MetaApi, readonly baseService: BaseService) {}

    /** 根据 metaId 获取 table 列定义 */
    async getTableColumnsByMetaId(metaId: string) {
        const res = await this.metaApi.getMetaById(metaId)

        const columnsOrder = []
        const columnsConfig: { [key: string]: IColumn } = {}
        for (const { caption, visible, key } of res) {
            if (visible) {
                columnsOrder.push(key)
                columnsConfig[key] = {
                    ui_widget: 'text',
                    ui_align: 'left',
                    ui_title: caption,
                }
            }
        }
        return {
            columnsOrder,
            columnsConfig,
        }
    }

    /** 根据 metaId 获取 form 定义 */
    async getFormSchemaByMetaId(metaId: string) {
        // 字段顺序
        const fieldsOrder: string[] = []
        // 字段配置
        const fieldsConfig: { [key: string]: IFormItem } = {}
        // 字段校验schema
        const verifySchema: IFormSchema['ui_verifySchema'] = {}
        // 转换promise
        const pros: ITransFormResult[] = []

        // 获取表单信息
        const res = await this.metaApi.getMetaById(metaId)

        // 过滤隐藏字段并转换
        for (const fieldInfo of res) {
            const { visible, key, fkeytype } = fieldInfo
            if (visible) {
                fieldsOrder.push(key)
                pros.push(transformMap[fkeytype](fieldInfo, this))
            }
        }

        // 等待所有转换完毕
        const transFormresult = await Promise.all(pros)
        transFormresult.forEach(({ config, verify }, index) => {
            const { key } = res[index]
            fieldsConfig[key] = config
            verifySchema[key] = verify
        })

        return {
            ui_verifySchema: verifySchema,
            fieldsConfig,
            fieldsOrder,
        }
    }
}
