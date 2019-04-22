export interface IMsgParam {
    userid_list?: string[]
    dept_id_list?: string[]
    to_all_user: boolean
}

export type IMsg = ITextMsg | IImageMsg | IVoiceMsg | IFileMsg | ILinkMsg | IOaMsg

/** 文本消息 */
interface ITextMsg {
    msgtype: 'text'
    text: IText
}

interface IText {
    content: string
}

/** 图片消息 */
interface IImageMsg {
    msgtype: 'image'
    image: IImage
}

interface IImage {
    /** 媒体文件id，可以通过媒体文件接口上传图片获取。建议宽600像素 x 400像素，宽高比3 : 2 */
    meta_id: string
}

/** 语音消息 */
interface IVoiceMsg {
    msgtype: 'voice'
    voice: IVoice
}

interface IVoice {
    /** 媒体文件id。2MB，播放长度不超过60s，AMR格式 */
    media_id: string
    /** 正整数，小于60，表示音频时长 */
    duration: string
}

/**
 * 文件消息
 * @param media_id 媒体文件id。引用的媒体文件最大10MB
 */
interface IFileMsg {
    msgtype: 'file'
    file: IFile
}

interface IFile {
    media_id: string
}

/** 链接消息 */
interface ILinkMsg {
    msgtype: 'link'
    link: ILink
}

interface ILink {
    /** 消息点击链接地址，当发送消息为E应用时支持E应用跳转链接 */
    messageUrl: string
    /** 图片地址 */
    picUrl: string
    /** 消息标题 */
    title: string
    /** 消息描述 */
    text: string
}

/** oa 消息 */
interface IOaMsg {
    msgtype: 'oa'
    oa: IOa
}

interface IOa {
    /** 消息点击链接地址，当发送消息为E应用时支持E应用跳转链接 */
    message_url: string
    /** PC端点击消息时跳转到的地址 */
    pc_message_url?: string
    head: string | IHead
    body: IBody[]
}

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
