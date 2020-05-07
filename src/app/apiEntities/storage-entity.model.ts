import {StorageTypes} from './storage-types-entity.model';

export class Storage {
    public id?: number;
    public title: string;
    public createdAt?: Date;
    public updatedAt?: Date;
    public status?: boolean;
    public description?: string;
    public pieces?: number;
    public price?: number;
    public storageTypes?: StorageTypes;


    constructor(
        id: number,
        title: string,
        createdAt: Date,
        updatedAt: Date,
        status: boolean,
        description: string,
        pieces: number,
        price: number,
        storageTypes: StorageTypes,
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
    }
}
