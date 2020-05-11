export class Order {
    public id?: number;
    public createdAt?: Date;
    public updatedAt?: Date;
    public status: boolean;

    constructor(
        id: number,
        title: string,
        createdAt: Date,
        updatedAt: Date,
        status: boolean
    ) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.status = status;
    }
}
