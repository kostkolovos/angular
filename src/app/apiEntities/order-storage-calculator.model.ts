import {Storage} from './storage-entity.model';
import {Order} from './order-entity.model';

export class OrderStorageCalculator {
    public id?: number;
    public orders: Order;
    public storage: Storage;
    public pieces: number;

    constructor(
        id: number,
        storage: Storage,
        orders: Order,
        pieces: number
    ) {
        this.id = id;
        this.storage = storage;
        this.orders = orders;
        this.pieces = pieces;
    }
}
