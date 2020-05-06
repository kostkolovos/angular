import {Component, OnDestroy, OnInit} from '@angular/core';
import {Storage} from '../../apiEntities/storage-entity.model';
import {StorageService} from '../storage.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-storage-details',
    templateUrl: './storage-details.component.html',
    styleUrls: ['./storage-details.component.css']
})
export class StorageDetailsComponent implements OnInit, OnDestroy {
    storage: Storage;
    id: number;
    subscription: Subscription;
    faEdit = faEdit;
    faTrash = faTrash;

    constructor(private storageService: StorageService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        this.subscription = this.storageService.storagesChanged.subscribe(
            (storages: Storage[]) => {
                this.storage = this.storageService.getStorage(this.id);
            }
        );

        this.route.params.subscribe(
            (params: Params) => {
                this.id = +params['id'];
                this.storage = this.storageService.getStorage(this.id);
            }
        );
    }

    onEditStorage() {
        this.router.navigate(['edit'], {relativeTo: this.route});
    }

    onDisableStorage() {
        this.storageService.disableStorage(this.id);
        this.router.navigate(['../']);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
