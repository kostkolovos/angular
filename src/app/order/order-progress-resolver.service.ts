import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {OrderProgress} from '../apiEntities/order.progress.model';
import {OrderProgressService} from './order-progress.service';

@Injectable({
    providedIn: 'root'
})
export class OrderProgressResolverService implements Resolve<OrderProgress[]> {

    constructor(private orderService: OrderProgressService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Observable<OrderProgress[]> | Promise<OrderProgress[]> | OrderProgress[] {
        const orders = this.orderService.getOrdersProgress();
        if (orders.length === 0) {
            return this.orderService.fetchOrderProgress();
        } else {
            return orders;
        }
    }
}
