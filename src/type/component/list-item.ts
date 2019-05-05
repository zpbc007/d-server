/**
 * 列表数据
 * 1. 下拉选择
 * 2. 长列表
 */
export interface IListItem<T = any> {
    text: string
    value: T
}
