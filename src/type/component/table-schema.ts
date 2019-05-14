export interface IColumn {
    ui_widget: 'action' | 'index' | 'text' | 'date' | 'boolean'
    ui_align?: 'left' | 'right' | 'center'
    ui_width?: number
    ui_title?: string
    ui_fixed?: boolean | ('left' | 'right')
}

export interface ITableSchema {
    /** 标题 */
    ui_title?: string
    /** 是否显示分页 */
    ui_showPagination?: boolean
    /** table滚动宽度 */
    ui_scrollX?: number
    /** table滚动高度 */
    ui_scrollY?: number
    /** 行唯一标识 */
    ui_rowKey: string
    /** table高度 */
    ui_height?: number
    /** 是否显示行选择 */
    ui_showRowSelect?: boolean
    /** 列顺序 */
    ui_order: string[]
    /** 数据url */
    ui_dataUrl: string
    /** 列定义 */
    [key: string]: IColumn | any
}
