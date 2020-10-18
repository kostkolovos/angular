import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {OrderProgress} from '../apiEntities/order.progress.model';

@Injectable({
    providedIn: 'root'
})
export class OrderProgressService {
    orderProgressChanged = new Subject<OrderProgress[]>();
    orderProgressUrl = environment.apiUrl + 'api/order_progresses';

    private orderProgress: OrderProgress[] = [];

    constructor(private http: HttpClient) {
    }

    getOrdersProgress() {
        return this.orderProgress.slice();
    }

    setOrderProgress(orderProgress: OrderProgress[]) {
        this.orderProgress = orderProgress;
        this.orderProgressChanged.next(this.orderProgress.slice());
    }


    getOrderProgress(id: number) {
        return this.orderProgress.find(orderProgress => orderProgress.id === id);
    }

    fetchOrderProgress() {
        return this.http.get<OrderProgress[]>(this.orderProgressUrl).pipe(
            tap(orderProgress => {
                this.setOrderProgress(orderProgress['hydra:member']);
            })
        );
    }
}
