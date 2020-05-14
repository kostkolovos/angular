export class Customer {
    public id?: number;
    public fullName: string;
    public mobile?: string;

    constructor(
        id: number,
        fullName: string,
        mobile: string
    ) {
        this.id = id;
        this.fullName = fullName;
        this.mobile = mobile;
    }
}
