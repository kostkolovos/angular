import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Storage} from '../apiEntities/storage-entity.model';
import {Observable} from 'rxjs';
import {StorageService} from './storage.service';
import {StorageTypeService} from './storage-type.service';

@Injectable({
    providedIn: 'root'
})
export class StorageResolverService implements Resolve<Storage[]> {

    constructor(private storageService: StorageService, private storageTypeService: StorageTypeService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Storage[]> | Promise<Storage[]> | Storage[] {
        this.storageTypeService.getstorageTypes();
        const storages = this.storageService.getStorages();
        if (storages.length === 0) {
            return this.storageService.fetchStorages();
        } else {
            return storages;
        }
    }
}
