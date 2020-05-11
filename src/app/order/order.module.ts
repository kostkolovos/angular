import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {OrderRoutingModule} from '../routing/order-routing.module';
import { OrderComponent } from './order.component';
import { OrderStartComponent } from './order-start/order-start.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderItemComponent } from './order-list/order-item/order-item.component';
import { OrderDetailsComponent } from './order-details/order-details.component';


@NgModule({
    declarations: [OrderComponent, OrderStartComponent, OrderListComponent, OrderItemComponent, OrderDetailsComponent],
    imports: [
        CommonModule,
        OrderRoutingModule,
        SharedModule,
        ReactiveFormsModule
    ]
})
export class OrderModule {
}
