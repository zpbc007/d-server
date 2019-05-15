import { FkeyField, TokenDataDto } from '@module-back/dto/TokenDataDto'
import { IInputDrawerValue } from '@type-comp/input-drawer'

const transformMap: { [key in FkeyField['dataType'] | 'DEFAULT']?: (dto: FkeyField) => any } = {
    DEFAULT: ({ jsonData }) => {
        return jsonData
    },
    /** radio 类型 选择值 */
    MULTI_CONSTANT: ({ jsonData }) => {
        return jsonData.split(',')
    },
    /** 主动选择 */
    SELECT: ({ jsonData, businessId }) => {
        return {
            value: businessId,
            showValue: jsonData,
        } as IInputDrawerValue
    },
}

/**
 * TokenDataDto 转为 form表单数据
 */
export function TokenDataDtoToFormData({ fields }: TokenDataDto) {
    return fields.reduce(
        (result, field) => {
            const { dataType, key } = field
            const value = (transformMap[dataType] || transformMap.DEFAULT)(field)
            return {
                ...result,
                [key]: value,
            }
        },
        {} as any,
    )
}
