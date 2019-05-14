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
    getRelMeta(bUnitId: string, metaId?: string) {
        return reqIns
            .setUrl('/bill/getRelMeta')
            .setQueryObj({
                businessUnitCode: bUnitId,
                metaId,
            })
            .get<TokenMetaInformationDto[]>()
    }

    /** 获取业务节点的关联meta下的数据 */
    getRelData(bUnitId: string, metaId: string, preMetaId?: string, preTokenId?: string) {
        return reqIns
            .setUrl('/bill/getRelData')
            .setQueryObj({
                businessUnitCode: bUnitId,
                metaId,
                preMetaId,
                preTokenId,
            })
            .get<TokenDataDto[]>()
    }
}
