import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {Order} from '../apiEntities/order-entity.model';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    ordersChanged = new Subject<Order[]>();
    orderUrl = environment.apiUrl + 'api/orders';
    private orders: Order[] = [];

    constructor(private http: HttpClient) {
    }

    getOrders() {
        return this.orders.slice();
    }

    fetchOrders() {
        return this.http.get<Order[]>(this.orderUrl).pipe(
            tap(orders => {
                this.setOrders(orders['hydra:member']);
            })
        );
    }

    setOrders(orders: Order[]) {
        this.orders = orders;
        this.ordersChanged.next(this.orders.slice());
    }

    getOrder(id: number) {
        return this.orders.find(orders => orders.id === id);
    }

    disableOrder(index: number) {
        const order = this.getOrder(index);
        order.status = false;
        this.updateOrders(index, order);
    }

    updateOrders(id: number, order: Order) {
        const index = this.orders.indexOf(this.getOrder(id));
        this.http.put<Order>(this.orderUrl + '/' + order.id, order).subscribe(orderEdit => {
            this.orders[index] = orderEdit;
            this.ordersChanged.next(this.orders.slice());
        });
    }

    addOrders(order: Order) {
        this.http.post<Order>(this.orderUrl, order).subscribe(orderAdded => {
            this.orders.push(orderAdded);
            this.ordersChanged.next(this.orders.slice());
        });
    }
}
