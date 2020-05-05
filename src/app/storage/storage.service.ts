import {Injectable} from '@angular/core';
import {Storage} from '../apiEntities/storage-entity.model';
import {Subject} from 'rxjs';
import {StorageCallsService} from '../apiEntities/storage-calls.service';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    storagesChanged = new Subject<Storage[]>();
    storageUrl = environment.apiUrl + 'api/storages';

    private storages: Storage[] = [];
    private disabledStorages: Storage[] = [];

    constructor(private http: HttpClient) {
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


    addStorages(storage: Storage) {
        this.storages.push(storage);
        this.storagesChanged.next(this.storages.slice());
        this.http.post(this.storageUrl, storage).subscribe();
    }

    updateStorages(index: number, storage: Storage) {
        this.storages[index] = storage;
        this.storagesChanged.next(this.storages.slice());
        this.http.put(this.storageUrl + '/' + storage.id, storage).subscribe();
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
