export class OrderProgress {
    public id?: number;
    public title: string;
    public sort?: number;

    constructor(id: number, title: string, sort: number) {
        this.title = title;
        this.id = id;
        this.sort = sort;
    }
}
