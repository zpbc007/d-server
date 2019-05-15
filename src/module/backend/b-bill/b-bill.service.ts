import { Injectable } from '@nestjs/common'
import { BBillApi } from './b-bill.api'
import { TokenDataDtoToFormData } from '@transformer/token-data-dto.form-data'
import { TokenDataDtoToTableData } from '@transformer/token-data-dto.table-data'

@Injectable()
export class BBillService {
    constructor(private readonly billApi: BBillApi) {}

    /** 获取表单数据 */
    async getFormDataByMetaIdAndTokenId(metaId: string, tokenId: string) {
        const data = await this.billApi.getBillToken(metaId, tokenId)
        return TokenDataDtoToFormData(data)
    }

    /** 获取关联表单数据 */
    async getRelData(bUnitId: string, metaId: string, preMetaId?: string, preTokenId?: string) {
        const data = await this.billApi.getRelData(bUnitId, metaId, preMetaId, preTokenId)
        return TokenDataDtoToTableData(data)
    }

    /** 获取分录数据 */
    async getEntryData(billMetaId: string, billTokenId: string, entryMetaId: string) {
        const data = await this.billApi.getEntryData(billMetaId, billTokenId, entryMetaId)

        return TokenDataDtoToTableData(data)
    }

    /** 新建表单 */
    async putBill(bUnitId: string, metaId: string) {
        const data = await this.billApi.putBill(bUnitId, metaId)
        return {
            formData: TokenDataDtoToFormData(data),
            tokenId: data.tokenId,
        }
    }
}
