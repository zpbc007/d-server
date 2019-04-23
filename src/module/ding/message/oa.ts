interface IHead {
    /** 消息头部的背景颜色。长度限制为8个英文字符，其中前2为表示透明度，后6位表示颜色值。不要添加0x */
    bgcolor: string
    /** 消息的头部标题 (向普通会话发送时有效，向企业会话发送时会被替换为微应用的名字)，长度限制为最多10个字符 */
    text: string
}

interface IBody {
    /** 消息体的标题 */
    title?: string
    /** 消息体的表单，最多显示6个，超过会被隐藏 */
    form?: IForm[]
    /** 单行富文本信息 */
    rich?: IRich
    /** 消息体的内容，最多显示3行 */
    content?: string
    /** 消息体中的图片，支持图片资源 */
    image?: string
    /** 自定义的附件数目。此数字仅供显示，钉钉不作验证 */
    file_count?: string
    /** 自定义的作者名字 */
    author?: string
}

interface IForm {
    /** 消息体的关键字 */
    key?: string
    /** 消息体的关键字对应的值 */
    value?: string
}

interface IRich {
    /** 单行富文本信息的数目 */
    num?: string
    /** 单行富文本信息的单位 */
    unit?: string
}

export class OaMsg {
    /** 消息点击链接地址，当发送消息为E应用时支持E应用跳转链接 */
    message_url: string
    /** PC端点击消息时跳转到的地址 */
    pc_message_url?: string
    head: string | IHead
    body: IBody[]
}
