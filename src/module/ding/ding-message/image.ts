interface IImage {
    /** 媒体文件id，可以通过媒体文件接口上传图片获取。建议宽600像素 x 400像素，宽高比3 : 2 */
    meta_id: string
}

export class ImageMsg {
    private readonly msgtype = 'image'
    image: IImage

    constructor(metaId: string) {
        this.image = {
            meta_id: metaId,
        }
    }
}
