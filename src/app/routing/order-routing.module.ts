import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth/auth.guard';
import {OrderComponent} from '../order/order.component';
import {OrderStartComponent} from '../order/order-start/order-start.component';
import {OrderResolverService} from '../order/order-resolver.service';
import {OrderDetailsComponent} from '../order/order-details/order-details.component';
import {OrderEditComponent} from '../order/order-edit/order-edit.component';
import {StorageResolverService} from '../storage/storage-resolver.service';
import {OrderProgressResolverService} from '../order/order-progress-resolver.service';

const routes: Routes = [{
    path: '',
    component: OrderComponent,
    canActivate: [AuthGuard],
    children: [
        {path: '', component: OrderStartComponent, resolve: [OrderResolverService]},
        {path: 'new', component: OrderEditComponent, resolve: [OrderResolverService, StorageResolverService, OrderProgressResolverService]},
        {path: ':id', component: OrderDetailsComponent, resolve: [OrderResolverService]},
        {
            path: ':id/edit',
            component: OrderEditComponent,
            resolve: [OrderResolverService, StorageResolverService, OrderProgressResolverService]
        }
    ]
}];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrderRoutingModule {
}
