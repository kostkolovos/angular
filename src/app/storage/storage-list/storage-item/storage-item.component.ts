import {Component, Input, OnInit} from '@angular/core';
import {Storage} from '../../../apiEntities/storage-entity.model';
import {faEuroSign, faBoxes, faEllipsisV} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-storage-item',
    templateUrl: './storage-item.component.html',
    styleUrls: ['./storage-item.component.css']
})
export class StorageItemComponent implements OnInit {

    @Input() storage: Storage;
    @Input() index: number;

    faEuroSign = faEuroSign;
    faBoxes = faBoxes;
    faEllipsisV = faEllipsisV;

    constructor() {
    }

    ngOnInit(): void {
    }

}
