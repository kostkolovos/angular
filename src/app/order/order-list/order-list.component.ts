import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {faCheck, faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {Order} from '../../apiEntities/order-entity.model';
import {OrderService} from '../order.service';
import {OrderProgressService} from '../order-progress.service';

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, OnDestroy {
    orders: Order[];
    subscription: Subscription;
    pipeStatus = true;
    faPlus = faPlus;
    faCheck = faCheck;
    faMinus = faMinus;
    orderProgress = this.orderProgressService.getOrdersProgress();
    pipeProgress = this.orderProgress.find(types => types.sort === 1).id;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private orderService: OrderService,
        private orderProgressService: OrderProgressService
    ) {
    }

    ngOnInit(): void {
        this.subscription = this.orderService.ordersChanged.subscribe(
            (orders: Order[]) => {
                this.orders = orders;
            }
        );

        this.orders = this.orderService.getOrders();
    }

    onNewOrder() {
        this.router.navigate(['new'], {relativeTo: this.route});
    }

    onChangeStatus() {
        this.pipeStatus = !this.pipeStatus;
    }

    onChangeProgress(progress) {
        this.pipeProgress = progress;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
