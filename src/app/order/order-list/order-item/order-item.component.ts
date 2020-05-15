import {Component, Input, OnInit} from '@angular/core';
import {Order} from '../../../apiEntities/order-entity.model';
import {faBoxes, faMars, faVenus} from '@fortawesome/free-solid-svg-icons';
import {StorageTypeService} from '../../../storage/storage-type.service';

@Component({
    selector: 'app-order-item',
    templateUrl: './order-item.component.html',
    styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
    faBoxes = faBoxes;
    faMars = faMars;
    faVenus = faVenus;
    storagePetTypeValue = this.storageTypeService.getStoragePetTypeValue();

    @Input() order: Order;
    @Input() index: number;

    constructor(private storageTypeService: StorageTypeService) {
    }

    ngOnInit(): void {
    }

}
