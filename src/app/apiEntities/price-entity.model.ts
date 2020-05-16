export class Price {
    public id?: number;
    public total: number;
    public initial?: number;
    public profit?: number;
    public shipping?: number;

    constructor(
        id: number,
        total: number,
        initial: number,
        profit: number,
        shipping: number
    ) {
        this.id = id;
        this.total = total;
        this.initial = initial;
        this.profit = profit;
        this.shipping = shipping;
    }
}
