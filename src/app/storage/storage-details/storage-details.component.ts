import {Component, OnDestroy, OnInit} from '@angular/core';
import {Storage} from '../../apiEntities/storage-entity.model';
import {StorageService} from '../storage.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {faBoxes, faEdit, faEuroSign, faTrash, faMars, faVenus, faBook, faPaw} from '@fortawesome/free-solid-svg-icons';
import {StorageTypeService} from '../storage-type.service';

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
    faEuroSign = faEuroSign;
    faBoxes = faBoxes;
    faMars = faMars;
    faVenus = faVenus;
    faBook = faBook;
    faPaw = faPaw;
    disabled: boolean;
    storagePetTypeValue = this.storageTypeService.getStoragePetTypeValue();
    bookletText: string;


    constructor(
        private storageService: StorageService,
        private route: ActivatedRoute,
        private router: Router,
        private storageTypeService: StorageTypeService
    ) {
    }

    ngOnInit(): void {

        this.subscription = this.storageService.storagesChanged.subscribe(
            (storages: Storage[]) => {
                this.storage = this.storageService.getStorage(this.id);
            }
        );

        this.route.params.subscribe(
            (params: Params) => {
                this.id = +params.id;
                this.storage = this.storageService.getStorage(this.id);
                this.disabled = this.storage.status;

                if (this.storage.storageTypes.title === this.storagePetTypeValue) {
                    this.bookletText = this.storageTypeService.getBookletValue(this.storage.storagePetTypes.find(Boolean).booklet);
                }

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
