import { Injectable } from '@nestjs/common'
import reqIns from '@utils/z-axios'
import { TokenDataDto } from '@module-back/dto/TokenDataDto'
import { TokenMetaInformationDto } from '@module-back/dto/TokenMetaInformationDto'

@Injectable()
export class BBillApi {
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

    /** 业务节点关联的meta */
    getRelMeta(bUnitCode: string, metaId?: string) {
        return reqIns
            .setUrl('/bill/getRelMeta')
            .setQueryObj({
                businessUnitCode: bUnitCode,
                metaId,
            })
            .get<TokenMetaInformationDto[]>()
    }
}
