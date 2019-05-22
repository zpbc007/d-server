import { Injectable } from '@nestjs/common'
import { BackMetaApi } from './back-meta.api'
import { BackBaseService } from '@module-back/back-base'
import { MetaInfoDtoToFormSchema } from '@transformer/meta-info-dto.form-schema'
import { MetaInfoDtoToTableSchema } from '@transformer/meta-info-dto.table-schema'

@Injectable()
export class BackMetaService {
    constructor(private readonly metaApi: BackMetaApi, readonly baseService: BackBaseService) {}

    /** 根据 metaId 获取 table 列定义 */
    async getTableColumnsByMetaId(metaId: string) {
        const res = await this.metaApi.getMetaById(metaId)

        return MetaInfoDtoToTableSchema(res)
    }

    /** 根据 metaId 获取 form 定义 */
    async getFormSchemaByMetaId(metaId: string) {
        // 获取表单信息
        const res = await this.metaApi.getMetaById(metaId)
        // 转换为form
        return MetaInfoDtoToFormSchema(res, this)
    }
}
