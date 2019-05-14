import { MetaInfoDTO } from '@module-back/dto/MetaInfoDTO'
import { IColumn } from '@type-comp/table-schema'
import { FkeyField } from '@module-back/dto/TokenDataDto'

const transformMap: {
    [key in FkeyField['dataType'] | '_DEFAULT']?: (info: MetaInfoDTO) => IColumn
} = {
    _DEFAULT: ({ caption }) => {
        return {
            ui_widget: 'text',
            ui_align: 'left',
            ui_title: caption,
        }
    },
    DATE: ({ caption }) => {
        return {
            ui_widget: 'date',
            ui_align: 'center',
            ui_title: caption,
        }
    },
    BOOLEAN: ({ caption }) => {
        return {
            ui_widget: 'boolean',
            ui_align: 'center',
            ui_title: caption,
        }
    },
}

export function MetaInfoDtoToTableSchema(metaInfoDtoArr: MetaInfoDTO[]) {
    const columnsOrder = []
    const columnsConfig: { [key: string]: IColumn } = {}
    for (const metaInfo of metaInfoDtoArr) {
        const { visible, key, fkeytype } = metaInfo

        if (visible) {
            columnsOrder.push(key)
            columnsConfig[key] = (transformMap[fkeytype] || transformMap._DEFAULT)(metaInfo)
        }
    }
    return {
        columnsOrder,
        columnsConfig,
    }
}
