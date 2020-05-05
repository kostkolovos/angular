import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Storage} from '../apiEntities/storage-entity.model';
import {Observable} from 'rxjs';
import {StorageService} from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class StorageResolverService implements Resolve<Storage[]> {

    constructor(private storageService: StorageService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Storage[]> | Promise<Storage[]> | Storage[] {
        const storages = this.storageService.getStorages();
        if (storages.length === 0) {
            return this.storageService.fetchStorages();
        } else {
            return storages;
        }
    }
}
