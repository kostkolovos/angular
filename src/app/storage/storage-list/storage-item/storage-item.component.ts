import {Component, Input, OnInit} from '@angular/core';
import {Storage} from '../../../apiEntities/storage-entity.model';
import {faEuroSign, faBoxes, faEllipsisV, faPaw, faMars, faVenus} from '@fortawesome/free-solid-svg-icons';
import {StorageTypeService} from '../../storage-type.service';

@Component({
    selector: 'app-storage-item',
    templateUrl: './storage-item.component.html',
    styleUrls: ['./storage-item.component.css']
})
export class StorageItemComponent implements OnInit {
    @Input() storage: Storage;
    @Input() index: number;

    storagePetTypeValue = this.storageTypeService.getStoragePetTypeValue();
    faEuroSign = faEuroSign;
    faBoxes = faBoxes;
    faEllipsisV = faEllipsisV;
    faPaw = faPaw;
    faMars = faMars;
    faVenus = faVenus;


    constructor(private storageTypeService: StorageTypeService) {
    }

    ngOnInit(): void {
    }

}
