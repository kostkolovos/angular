import {Storage} from './storage-entity.model';
import {Order} from './order-entity.model';
import {StoragePetType} from './storage-pet-type-entity.model';
import {Price} from './price-entity.model';

export class OrderStorageCalculator {
    public id?: number;
    public orders: Order;
    public storage: Storage;
    public pieces: number;
    public storagePetType: StoragePetType[];
    public price: Price;
    public finalPrice: number;

    constructor(
        id: number,
        storage: Storage,
        orders: Order,
        pieces: number,
        storagePetType: StoragePetType[],
        price: Price,
        finalPrice: number
    ) {
        this.id = id;
        this.storage = storage;
        this.orders = orders;
        this.pieces = pieces;
        this.storagePetType = storagePetType;
        this.price = price;
        this.finalPrice = finalPrice;
    }
}
