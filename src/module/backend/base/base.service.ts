import { Injectable } from '@nestjs/common'
import { BaseApi } from './base.api'
import { TokenDataDtoToFormData } from '@transformer/token-data-dto.form-data'

@Injectable()
export class BaseService {
    constructor(private readonly baseApi: BaseApi) {}

    /** 根据 metaId tokenId 获取详情页面数据 */
    async getFormDataByMetaIdAndTokenId(metaId: string, tokenId: string) {
        const data = await this.baseApi.getMetaInfoByMetaIdAndTokenId(metaId, tokenId)
        return TokenDataDtoToFormData(data)
    }

    /** 根据fkey查询常量 */
    async getConstant(fkey: string) {
        const res = await this.baseApi.getConstant(fkey)
        return (res || '').split(',')
    }
}
