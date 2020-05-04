import {Injectable} from '@angular/core';
import {Storage} from '../apiEntities/storage-entity.model';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    storagesChanged = new Subject<Storage[]>();

    private storages: Storage[] = [];

    constructor() {
    }

    getStorages() {
        return this.storages.slice();
    }


    setStorages(recipes: Storage[]) {
        this.storages = recipes;
        this.storagesChanged.next(this.storages.slice());
    }


    getStorage(id: number) {
        return this.storages[id];
    }
}
