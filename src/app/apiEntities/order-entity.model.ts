import {OrderStorageCalculator} from './order-storage-calculator.model';

export class Order {
    public id?: number;
    public createdAt?: Date;
    public updatedAt?: Date;
    public status: boolean;
    public orderStorageCalculators?: OrderStorageCalculator[];

    constructor(
        id: number,
        title: string,
        createdAt: Date,
        updatedAt: Date,
        status: boolean,
        orderStorageCalculators: OrderStorageCalculator[]
    ) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.status = status;
        this.orderStorageCalculators = orderStorageCalculators;
    }
}
