import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { StorageStartComponent } from './storage-start/storage-start.component';
import {StorageRoutingModule} from '../routing/storage-routing.module';
import { StorageListComponent } from './storage-list/storage-list.component';
import { StorageItemComponent } from './storage-list/storage-item/storage-item.component';
import { StorageDetailsComponent } from './storage-details/storage-details.component';


@NgModule({
    declarations: [StorageStartComponent, StorageListComponent, StorageItemComponent, StorageDetailsComponent],
    exports: [
        StorageListComponent
    ],
    imports: [
        CommonModule,
        StorageRoutingModule
    ]
})
export class StorageModule {
}
