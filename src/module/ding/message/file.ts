interface IFile {
    media_id: string
}

export class FileMsg {
    private readonly msgtype = 'file'
    file: IFile

    constructor({ media_id = '' }: IFile) {
        this.file = {
            media_id,
        }
    }
}
