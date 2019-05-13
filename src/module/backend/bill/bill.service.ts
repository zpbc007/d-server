import { Injectable } from '@nestjs/common'
import { BillApi } from './bill.api'
import { TokenDataDtoToFormData } from '@transformer/token-data-dto.form-data'

@Injectable()
export class BillService {
    constructor(private readonly billApi: BillApi) {}

    async getFormDataByMetaIdAndTokenId(metaId: string, tokenId: string) {
        const data = await this.billApi.getBillToken(metaId, tokenId)
        return TokenDataDtoToFormData(data)
    }
}
