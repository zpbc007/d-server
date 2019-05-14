import { Injectable } from '@nestjs/common'
import { BBillApi } from './b-bill.api'
import { TokenDataDtoToFormData } from '@transformer/token-data-dto.form-data'
import { TokenDataDtoToTableData } from '@transformer/token-data-dto.table-data'

@Injectable()
export class BBillService {
    constructor(private readonly billApi: BBillApi) {}

    async getFormDataByMetaIdAndTokenId(metaId: string, tokenId: string) {
        const data = await this.billApi.getBillToken(metaId, tokenId)
        return TokenDataDtoToFormData(data)
    }

    async getRelData(bUnitId: string, metaId: string, preMetaId?: string, preTokenId?: string) {
        const data = await this.billApi.getRelData(bUnitId, metaId, preMetaId, preTokenId)
        return TokenDataDtoToTableData(data)
    }
}
