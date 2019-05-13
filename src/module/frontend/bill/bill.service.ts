import { Injectable } from '@nestjs/common'
import { BBillService, BBillApi } from '@module-back/b-bill'
import { MetaService } from '@module-back/meta'
import { MergeSchemaService } from '@module-front/merge-schema'
import { IListItem } from '@type-comp/list-item'

@Injectable()
export class BillService {
    constructor(
        private readonly backBillService: BBillService,
        private readonly backBillApi: BBillApi,
        private readonly metaService: MetaService,
        private readonly mergeSchemaService: MergeSchemaService,
    ) {}

    async getBillPageByMetaIdAndTokenId(metaId: string, tokenId: string) {
        const [formConfig, data] = await Promise.all([
            this.metaService.getFormSchemaByMetaId(metaId),
            this.backBillService.getFormDataByMetaIdAndTokenId(metaId, tokenId),
        ])

        return {
            schema: this.mergeSchemaService.createDefaultFormSchema(formConfig, false),
            data,
        }
    }

    async getRelMeta(bUnitId: string, metaId?: string) {
        const metaList = await this.backBillApi.getRelMeta(bUnitId, metaId)

        return metaList.map(({ tokenMetaId, tokenMetaName }) => {
            return {
                text: tokenMetaName,
                value: tokenMetaId,
            } as IListItem<string>
        })
    }
}
