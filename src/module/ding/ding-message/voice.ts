interface IVoice {
    /** 媒体文件id。2MB，播放长度不超过60s，AMR格式 */
    media_id: string
    /** 正整数，小于60，表示音频时长 */
    duration: string
}

export class VoiceMsg {
    private readonly msgtype = 'voice'
    voice: IVoice

    constructor({ media_id = '', duration = '0' }: IVoice) {
        this.voice = {
            media_id,
            duration,
        }
    }
}
