import {Injectable, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {StorageTypes} from '../apiEntities/storage-types-entity.model';

@Injectable({
    providedIn: 'root'
})
export class StorageTypeService {
    storageTypesChanged = new Subject<StorageTypes[]>();
    storageTypeUrl = environment.apiUrl + 'api/storage_types';

    private storageTypes: StorageTypes[] = [];

    constructor(private http: HttpClient) {
    }

    getstorageTypes() {

        if (this.storageTypes.length === 0) {
            this.fetchstorageTypes();
        }

        return this.storageTypes.slice();

    }

    setstorageTypes(storageTypes: StorageTypes[]) {
        this.storageTypes = storageTypes;
        this.storageTypesChanged.next(this.storageTypes.slice());
    }


    getstorageType(id: number) {

        if (this.storageTypes.length === 0) {
            this.fetchstorageTypes();
        }

        return this.storageTypes.find(storageTypes => storageTypes.id === id);
    }


    addstorageTypes(storageType: StorageTypes) {
        this.http.post<StorageTypes>(this.storageTypeUrl, storageType).subscribe(storageTypeAdded => {
            this.storageTypes.push(storageTypeAdded);
            this.storageTypesChanged.next(this.storageTypes.slice());
        });
    }

    updatestorageTypes(id: number, storageType: StorageTypes) {
        const index = this.storageTypes.indexOf(this.getstorageType(id));
        this.http.put<StorageTypes>(this.storageTypeUrl + '/' + storageType.id, storageType).subscribe(storageTypeEdit => {
            this.storageTypes[index] = storageTypeEdit;
            this.storageTypesChanged.next(this.storageTypes.slice());
        });
    }


    fetchstorageTypes() {
        this.http.get<StorageTypes[]>(this.storageTypeUrl).subscribe((storageTypes => {
            this.setstorageTypes(storageTypes['hydra:member']);
        }));
    }
}

