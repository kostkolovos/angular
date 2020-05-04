import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Storage} from '../../apiEntities/storage-entity.model';
import {Subscription} from 'rxjs';
import {StorageService} from '../storage.service';

@Component({
    selector: 'app-storage-list',
    templateUrl: './storage-list.component.html',
    styleUrls: ['./storage-list.component.css']
})
export class StorageListComponent implements OnInit, OnDestroy {
    storages: Storage[];
    subscription: Subscription;

    constructor(private router: Router, private route: ActivatedRoute, private storageService: StorageService) {
    }

    ngOnInit(): void {
        this.subscription = this.storageService.storagesChanged.subscribe(
            (storages: Storage[]) => {
                this.storages = storages;
            }
        );

        this.storages = this.storageService.getStorages();
    }

    onNewStore() {
        this.router.navigate(['new'], {relativeTo: this.route});
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
