import {Injectable} from '@angular/core';
import {Storage} from '../apiEntities/storage-entity.model';
import {Subject} from 'rxjs';
import {StorageCallsService} from '../apiEntities/storage-calls.service';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    storagesChanged = new Subject<Storage[]>();

    private storages: Storage[] = [];
    private disabledStorages: Storage[] = [];

    constructor() {
    }

    getStorages() {
        return this.storages.slice();
    }


    setStorages(storages: Storage[]) {
        this.storages = storages;
        this.storagesChanged.next(this.storages.slice());
    }


    getStorage(id: number) {
        return this.storages[id];
    }

    /*Disabled storages*/
    disableStorage(index: number) {
        this.addDisabledStorage(this.storages[index]);
        this.storages.splice(index, 1);
        this.storagesChanged.next(this.storages.slice());
    }

    getDisabledStorages() {
        return this.disabledStorages.slice();
    }

    addDisabledStorage(disabledStorage: Storage) {
        this.disabledStorages.push(disabledStorage);
    }

    setDisabledStorage(storages: Storage[]) {
        this.disabledStorages = storages;
    }

}
