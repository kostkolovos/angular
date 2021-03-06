import {OrderStorageCalculator} from './order-storage-calculator.model';
import {Customer} from './customer-entity.model';
import {OrderProgress} from './order.progress.model';

export class Order {
    public id?: number;
    public createdAt?: Date;
    public updatedAt?: Date;
    public status: boolean;
    public orderStorageCalculators?: OrderStorageCalculator[];
    public description?: string;
    public customer: Customer;
    public orderPrice: number;
    public orderProgress?: OrderProgress;

    constructor(
        id: number,
        title: string,
        createdAt: Date,
        updatedAt: Date,
        status: boolean,
        orderStorageCalculators: OrderStorageCalculator[],
        description: string,
        customer: Customer,
        orderPrice: number,
        orderProgress: OrderProgress
    ) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.status = status;
        this.orderStorageCalculators = orderStorageCalculators;
        this.description = description;
        this.customer = customer;
        this.orderPrice = orderPrice;
        this.orderProgress = orderProgress;
    }
}
