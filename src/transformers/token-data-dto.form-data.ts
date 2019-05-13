import { FkeyField, TokenDataDto } from '@module-back/dto/TokenDataDto'

const transformMap: { [key in FkeyField['dataType'] | 'DEFAULT']?: (jsonData: any) => any } = {
    DEFAULT: (jsonData) => {
        return jsonData
    },
    MULTI_CONSTANT: (jsonData: string) => {
        return jsonData.split(',')
    },
}

/**
 * TokenDataDto 转为 form表单数据
 */
export function TokenDataDtoToFormData({ fields }: TokenDataDto) {
    return fields.reduce(
        (result, { jsonData, dataType, key }) => {
            const value = (transformMap[dataType] || transformMap.DEFAULT)(jsonData)
            return {
                ...result,
                [key]: value,
            }
        },
        {} as any,
    )
}
