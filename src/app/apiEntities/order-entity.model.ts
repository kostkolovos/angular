export class Order {
    public id?: number;
    public createdAt?: Date;
    public updatedAt?: Date;
    public status: boolean;
    public storage: Storage[];

    constructor(
        id: number,
        title: string,
        createdAt: Date,
        updatedAt: Date,
        status: boolean,
        storage: Storage[]
    ) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.status = status;
        this.storage = storage;
    }
}
