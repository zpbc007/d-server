import { MetaInfoDTO } from '@module-back/dto/MetaInfoDTO'
import { IColumn } from '@type-comp/table-schema'

export function MetaInfoDtoToTableSchema(metaInfoDtoArr: MetaInfoDTO[]) {
    const columnsOrder = []
    const columnsConfig: { [key: string]: IColumn } = {}
    for (const { caption, visible, key } of metaInfoDtoArr) {
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
