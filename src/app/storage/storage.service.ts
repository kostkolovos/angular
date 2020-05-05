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
        return this.storages.slice().filter(storage => storage.status === true);
    }

    getDisabledStorages() {
        return this.storages.slice().filter(storage => storage.status === false);
    }


    setStorages(storages: Storage[]) {
        this.storages = storages;
        this.storagesChanged.next(this.storages.slice());
    }


    getStorage(id: number) {
        return this.storages[id];
    }


    addStorages(storages: Storage) {
        this.storages.push(storages);
        this.storagesChanged.next(this.storages.slice());
    }

    updateStorages(index: number, newRecipe: Storage) {
        this.storages[index] = newRecipe;
        this.storagesChanged.next(this.storages.slice());
    }

    /*Disabled storages*/

    disableStorage(index: number) {
        this.addDisabledStorage(this.storages[index]);
        this.storages[index].status = false;
        this.storagesChanged.next(this.storages.slice());
    }

    getToDisableStorages() {
        return this.disabledStorages.slice();
    }

    addDisabledStorage(disabledStorage: Storage) {
        this.disabledStorages.push(disabledStorage);
    }

    setDisabledStorage(storages: Storage[]) {
        this.disabledStorages = storages;
    }

    /*Disabled storages*/
}
