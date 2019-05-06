import { Injectable } from '@nestjs/common'
import { MetaApi } from './meta.api'
import { ICoulmn } from '@type-comp/table-schema'

@Injectable()
export class MetaService {
    constructor(private readonly metaApi: MetaApi) {}

    /** 根据 metaId 获取 table 列定义 */
    async getTableColumnsByMetaId(metaId: string) {
        const res = await this.metaApi.getMetaById(metaId)
        const columnsOrder = []
        const columnsConfig: { [key: string]: ICoulmn } = {}
        for (const { caption, visible, key } of res) {
            if (visible) {
                columnsOrder.push(key)
                columnsConfig[key] = {
                    ui_widget: 'text',
                    ui_align: 'left',
                    ui_title: caption,
                }
            }
        }
        return {
            columnsOrder,
            columnsConfig,
        }
    }
}
