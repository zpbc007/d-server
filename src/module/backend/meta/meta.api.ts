import { Injectable } from '@nestjs/common'
import reqIns from '@utils/z-axios'
import { MetaInfoDTO } from '@module-back/dto/MetaInfoDTO'

@Injectable()
export class MetaApi {
    /**
     * 根据metaId获取对应的meta信息
     */
    getMetaById(metaId: string) {
        return reqIns
            .setUrl(`/meta/findByMetaId`)
            .setQueryObj({
                metaId,
            })
            .get<MetaInfoDTO[]>()
    }
}
