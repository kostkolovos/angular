import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Storage} from '../apiEntities/storage-entity.model';
import {StorageCallsService} from '../apiEntities/storage-calls.service';
import {Observable} from 'rxjs';
import {StorageService} from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class StorageResolverService implements Resolve<Storage[]> {

    constructor(private storageCall: StorageCallsService, private recipes: StorageService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Storage[]> | Promise<Storage[]> | Storage[] {
        const storages = this.recipes.getStorages();
        if (storages.length === 0) {
            return this.storageCall.fetchStorages();
        } else {
            return storages;
        }
    }
}
