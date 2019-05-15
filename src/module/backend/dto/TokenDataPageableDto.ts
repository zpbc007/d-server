import { ReducedTokenDataDto } from './ReducedTokenDataDto'

export interface TokenDataPageableDto {
    pageSize: number
    pageNo: number
    total: number
    tokenDataDtoList: ReducedTokenDataDto[]
}
