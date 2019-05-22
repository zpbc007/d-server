import { TokenDataDto } from '@module-back/back-dto/TokenDataDto'

export function TokenDataDtoToTableData(tokenDataDtos: TokenDataDto[]) {
    return tokenDataDtos.map(({ tokenId, fields = [] }) => {
        return {
            tokenId,
            ...fields.reduce(
                (data, { key, jsonData }) => ({
                    ...data,
                    [key]: jsonData,
                }),
                {} as any,
            ),
        }
    })
}
