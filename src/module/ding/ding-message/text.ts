/** 文本消息 */
export class TextMsg {
    private readonly msgtype = 'text'
    text = ''

    constructor(text: string) {
        this.text = text
    }
}
