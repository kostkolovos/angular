import {Component, Input, OnInit} from '@angular/core';
import {Storage} from '../../../apiEntities/storage-entity.model';

@Component({
    selector: 'app-storage-item',
    templateUrl: './storage-item.component.html',
    styleUrls: ['./storage-item.component.css']
})
export class StorageItemComponent implements OnInit {

    @Input() storage: Storage;
    @Input() index: number;

    constructor() {
    }

    ngOnInit(): void {
    }

}
