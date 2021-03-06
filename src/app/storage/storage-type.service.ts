import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {StorageTypes} from '../apiEntities/storage-types-entity.model';
import {tap} from 'rxjs/operators';

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
        return this.storageTypes.slice();
    }

    setstorageTypes(storageTypes: StorageTypes[]) {
        this.storageTypes = storageTypes;
        this.storageTypesChanged.next(this.storageTypes.slice());
    }


    getstorageType(id: number) {
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
        return this.http.get<StorageTypes[]>(this.storageTypeUrl).pipe(
            tap(storageTypes => {
                this.setstorageTypes(storageTypes['hydra:member']);
            })
        );
    }


    getStoragePetTypeValue() {
        return 'StoragePetType';
    }

    getBookletValues() {
        return [
            {value: null, text: 'storage.without'},
            {value: 'GR', text: 'storage.greek'},
            {value: 'EU', text: 'storage.european'},
        ];
    }

    getBookletValue(booklet) {
        const bookletValues = this.getBookletValues();
        return bookletValues.find(value => value.value == booklet).text;
    }

    getTypeValues() {
        return [
            {value: 'Simple', text: 'storage.general'},
            {value: 'StoragePetType', text: 'storage.pets'},
        ];
    }

    getTypeValue(type) {
        const typeValues = this.getTypeValues();
        return typeValues.find(value => value.value == type).text;
    }
}

