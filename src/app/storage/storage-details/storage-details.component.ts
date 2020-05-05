import {Component, OnInit} from '@angular/core';
import {Storage} from '../../apiEntities/storage-entity.model';
import {StorageService} from '../storage.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
    selector: 'app-storage-details',
    templateUrl: './storage-details.component.html',
    styleUrls: ['./storage-details.component.css']
})
export class StorageDetailsComponent implements OnInit {
    storage: Storage;
    id: number;

    constructor(private storageService: StorageService, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
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
        this.router.navigate(['/storages']);
    }

}
