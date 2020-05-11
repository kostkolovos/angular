import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
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


    getStoragePetTypeValue() {
        return 'StoragePetType';
    }

    getBookletValues() {
        return [
            {value: null, text: 'Χωρίς'},
            {value: 'GR', text: 'Ελληνικό'},
            {value: 'EU', text: 'Ευρωπαικό'},
        ];
    }

    getBookletValue(booklet) {
        const bookletValues = this.getBookletValues();
        return bookletValues.find(value => value.value == booklet).text;
    }

    getTypeValues() {
        return [
            {value: 'Simple', text: 'Γενικό'},
            {value: 'StoragePetType', text: 'Κατοικίδια'},
        ];
    }

    getTypeValue(type) {
        const typeValues = this.getTypeValues();
        return typeValues.find(value => value.value == type).text;
    }
}

