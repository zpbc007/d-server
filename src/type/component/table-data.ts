export interface ITableData<T = any> {
    data: T[]
    pageNo?: number
    pageSize?: number
    total?: number
}
