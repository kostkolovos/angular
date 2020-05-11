import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Order} from '../apiEntities/order-entity.model';
import {OrderService} from './order.service';

@Injectable({
    providedIn: 'root'
})
export class OrderResolverService implements Resolve<Order[]> {

    constructor(private orderService: OrderService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Order[]> | Promise<Order[]> | Order[] {
        const orders = this.orderService.getOrders();
        if (orders.length === 0) {
            return this.orderService.fetchOrders();
        } else {
            return orders;
        }
    }
}
