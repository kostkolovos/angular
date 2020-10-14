import {Injectable} from '@angular/core';
import {Storage} from '../apiEntities/storage-entity.model';
import {Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {MediaObject} from '../apiEntities/media-object-entity.model';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    storagesChanged = new Subject<Storage[]>();
    storageUrl = environment.apiUrl + 'api/storages';
    imageRenderingPath = environment.apiUrl + 'api/media';

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

    getAvailableStorages() {
        return this.storages.filter(value => value.status === true);
    }

    disableStorage(index: number) {
        const storage = this.getStorage(index);
        storage.status = false;
        this.updateStorages(index, storage);
    }

    getImage(image: MediaObject) {
        return this.http.get(this.imageRenderingPath + '/download/' + image.id, {responseType: 'blob'}).subscribe(val => {
            const url = URL.createObjectURL(val);
            this.downloadUrl(url, this.generateUID(14));
            URL.revokeObjectURL(url);
        });
    }

    downloadUrl(url: string, fileName: string) {
        const a: any = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.style = 'display: none';
        a.click();
        a.remove();
    }

    generateUID(length) {
        return window.btoa(Array.from(window.crypto.getRandomValues(new Uint8Array(length * 2)))
            .map((b) => String.fromCharCode(b)).join('')).replace(/[+/]/g, '').substring(0, length);
    }
}
