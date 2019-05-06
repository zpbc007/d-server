import { Injectable } from '@nestjs/common'
import { BaseApi } from './base.api'
import { FkeyField } from '@module-back/dto/TokenDataDto'

const transformMap: { [key in FkeyField['dataType'] | 'DEFAULT']?: (jsonData: any) => any } = {
    DEFAULT: (jsonData) => {
        return jsonData
    },
    MULTI_CONSTANT: (jsonData: string) => {
        return jsonData.split(',')
    },
}

@Injectable()
export class BaseService {
    constructor(private readonly baseApi: BaseApi) {}

    /** 根据 metaId tokenId 获取详情页面数据 */
    async getFormDataByMetaIdAndTokenId(metaId: string, tokenId: string) {
        const { fields = [] } = await this.baseApi.getMetaInfoByMetaIdAndTokenId(metaId, tokenId)

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

    /** 根据fkey查询常量 */
    async getConstant(fkey: string) {
        const res = await this.baseApi.getConstant(fkey)
        return (res || '').split(',')
    }
}
