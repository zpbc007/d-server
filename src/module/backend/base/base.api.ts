import { Injectable } from '@nestjs/common'
import reqIns from '@utils/z-axios'
import { TokenDataDto } from '@module-back/dto/TokenDataDto'

@Injectable()
export class BaseApi {
    /** 取得meta详细数据 */
    getMetaInfoByMetaIdAndTokenId(metaId: string, tokenId: string) {
        return reqIns
            .setUrl(`/base/metaId/tokenId`)
            .setQueryObj({
                metaId,
                tokenId,
            })
            .get<TokenDataDto>()
    }

    /** 根据fkey查询常量 */
    getConstant(fkey: string) {
        return reqIns.setUrl(`/base/constant/${fkey}`).get<string>()
    }
}
