import {StorageTypes} from './storage-types-entity.model';
import {StoragePetType} from './storage-pet-type-entity.model';
import {OrderStorageCalculator} from './order-storage-calculator.model';
import {Price} from './price-entity.model';
import {MediaObject} from './media-object-entity.model';
import {StorageLink} from './storage-link-entity.model';

export class Storage {
    public id?: number;
    public title: string;
    public createdAt?: Date;
    public updatedAt?: Date;
    public status?: boolean;
    public description?: string;
    public pieces?: number;
    public price: Price;
    public storageTypes?: StorageTypes;
    public storagePetTypes?: StoragePetType[];
    public orderStorageCalculators?: OrderStorageCalculator[];
    public images?: MediaObject[];
    public storageLinks?: StorageLink[];

    constructor(
        id: number,
        title: string,
        createdAt: Date,
        updatedAt: Date,
        status: boolean,
        description: string,
        pieces: number,
        price: Price,
        storageTypes: StorageTypes,
        storagePetTypes: StoragePetType[],
        orderStorageCalculators: OrderStorageCalculator[],
        images: MediaObject[],
        storageLinks: StorageLink[]
    ) {
        this.title = title;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.status = status;
        this.id = id;
        this.description = description;
        this.pieces = pieces;
        this.price = price;
        this.storageTypes = storageTypes;
        this.storagePetTypes = storagePetTypes;
        this.orderStorageCalculators = orderStorageCalculators;
        this.images = images;
        this.storageLinks = storageLinks;
    }
}
