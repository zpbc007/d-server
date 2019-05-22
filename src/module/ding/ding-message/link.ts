export interface ILink {
    /** 消息点击链接地址，当发送消息为E应用时支持E应用跳转链接 */
    messageUrl: string
    /** 图片地址 */
    picUrl: string
    /** 消息标题 */
    title: string
    /** 消息描述 */
    text: string
}

export class LinkMsg {
    private readonly msgtype = 'link'
    link: ILink = null

    constructor({ messageUrl = '', picUrl = '', title = '', text = '' }: ILink) {
        this.link = {
            ...this.link,
            messageUrl,
            picUrl,
            title,
            text,
        }
    }
}
