import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { StorageStartComponent } from './storage-start/storage-start.component';
import {StorageRoutingModule} from '../routing/storage-routing.module';


@NgModule({
    declarations: [StorageStartComponent],
    imports: [
        CommonModule,
        StorageRoutingModule
    ]
})
export class StorageModule {
}
