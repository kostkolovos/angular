import {Injectable} from '@angular/core';
import {Storage} from '../apiEntities/storage-entity.model';
import {Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    storagesChanged = new Subject<Storage[]>();
    storageUrl = environment.apiUrl + 'api/storages';

    private storages: Storage[] = [];

    constructor(private http: HttpClient) {
    }

    getStorages() {
        return this.storages.slice();
    }

    setStorages(storages: Storage[]) {
        this.storages = storages;
        this.storagesChanged.next(this.storages.slice());
    }


    getStorage(id: number) {
        return this.storages.find(storages => storages.id === id);
    }


    addStorages(storage: Storage) {
        this.http.post<Storage>(this.storageUrl, storage).subscribe(storageAdded => {
            this.storages.push(storageAdded);
            this.storagesChanged.next(this.storages.slice());
        });
    }

    updateStorages(id: number, storage: Storage) {
        const index = this.storages.indexOf(this.getStorage(id));
        this.http.put<Storage>(this.storageUrl + '/' + storage.id, storage).subscribe(storageEdit => {
            this.storages[index] = storageEdit;
            this.storagesChanged.next(this.storages.slice());
        });
    }


    fetchStorages() {
        return this.http.get<Storage[]>(this.storageUrl).pipe(
            tap(storages => {
                this.setStorages(storages['hydra:member']);
            })
        );
    }

    disableStorage(index: number) {
        const storage = this.getStorage(index);
        storage.status = false;
        this.updateStorages(index, storage);
    }
}
