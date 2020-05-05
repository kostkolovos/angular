import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Storage} from './storage-entity.model';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {StorageService} from '../storage/storage.service';

@Injectable({
    providedIn: 'root'
})
export class StorageCallsService {
    storageUrl = environment.apiUrl + 'api/storages';

    constructor(private http: HttpClient, private storageService: StorageService) {
    }

    fetchStorages() {
        return this.http.get<Storage[]>(this.storageUrl).pipe(
            /*Return only specific data from object*/
            tap(recipes => {
                this.storageService.setStorages(recipes['hydra:member']);
            })
        );
    }

    disableStorages(storages: Storage[]) {
        for (const storage of storages) {
            storage.status = false;
            this.http.put(this.storageUrl + '/' + storage.id, storage).subscribe(responce => {
            });
        }

        this.storageService.setDisabledStorage(null);
    }

}
