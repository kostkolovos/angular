import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {StorageTypeService} from './storage-type.service';
import {StorageTypes} from '../apiEntities/storage-types-entity.model';

@Injectable({
    providedIn: 'root'
})
export class StorageTypeResolverService implements Resolve<StorageTypes[]> {

    constructor(private storageTypeService: StorageTypeService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Observable<StorageTypes[]> | Promise<StorageTypes[]> | StorageTypes[] {
        const storageTypes = this.storageTypeService.getstorageTypes();
        if (storageTypes.length === 0) {
            return this.storageTypeService.fetchstorageTypes();
        } else {
            return storageTypes;
        }
    }
}
