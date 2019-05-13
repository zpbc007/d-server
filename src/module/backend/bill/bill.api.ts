import { Injectable } from '@nestjs/common'
import reqIns from '@utils/z-axios'
import { TokenDataDto } from '@module-back/dto/TokenDataDto'

@Injectable()
export class BillApi {
    /** 表单一览信息 */
    getBillToken(metaId: string, tokenId: string) {
        return reqIns
            .setUrl('/bill/bill/meta-id/token-id')
            .setQueryObj({
                metaId,
                tokenId,
            })
            .get<TokenDataDto>()
    }
}
