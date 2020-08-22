export class MediaObject {
    public id?: number;
    public contentUrl: string;
    public filePath: string;

    constructor(
        id: number,
        contentUrl: string,
        filePath: string,
    ) {
        this.id = id;
        this.contentUrl = contentUrl;
        this.filePath = filePath;
    }
}
