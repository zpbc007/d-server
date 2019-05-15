import { Injectable } from '@nestjs/common'
import { BaseApi } from './base.api'
import { TokenDataDtoToFormData } from '@transformer/token-data-dto.form-data'
import { TokenDataPageableDtoToTableData } from '@transformer/token-data-pageable-dto.table-data'

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

    /** 获取 select 类型的一览数据 */
    async getSelectTableData(metaId: string, pageNo: number, pageSize: number) {
        const data = await this.baseApi.getMetaListData(metaId, pageNo, pageSize)
        return TokenDataPageableDtoToTableData(data)
    }
}
