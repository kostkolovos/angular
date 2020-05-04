export class Storage {
    public id?: number;
    public title: string;
    public createdAt?: Date;
    public updatedAt?: Date;
    public status?: boolean;

    constructor(id: number, title: string, createdAt: Date, updatedAt: Date, status: boolean) {
        this.title = title;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.status = status;
        this.id = id;
    }
}
