export class Storage {
    public id?: number;
    public title: string;
    public createdAt?: Date;
    public updatedAt?: Date;
    public status?: boolean;
    public description?: string;
    public pieces?: number;
    public price?: number;


    constructor(
        id: number,
        title: string,
        createdAt: Date,
        updatedAt: Date,
        status: boolean,
        description: string,
        pieces: number,
        price: number
    ) {
        this.title = title;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.status = status;
        this.id = id;
        this.description = description;
        this.pieces = pieces;
        this.price = price;
    }
}
