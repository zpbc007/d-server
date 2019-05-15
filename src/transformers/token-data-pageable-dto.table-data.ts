import { TokenDataPageableDto } from '@module-back/dto/TokenDataPageableDto'
import { ITableData } from '@type-comp/table-data'

export function TokenDataPageableDtoToTableData({
    pageSize,
    pageNo,
    total,
    tokenDataDtoList,
}: TokenDataPageableDto) {
    return {
        pageNo,
        pageSize,
        total,
        data: tokenDataDtoList.map(({ tokenId, fields }) => {
            return {
                tokenId,
                ...fields.reduce(
                    (result, { key, jsonData }) => {
                        return {
                            ...result,
                            [key]: jsonData,
                        }
                    },
                    {} as any,
                ),
            }
        }),
    } as ITableData
}
