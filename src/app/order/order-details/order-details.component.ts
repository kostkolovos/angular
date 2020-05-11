import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {faBook, faBoxes, faEdit, faEuroSign, faMars, faTrash, faVenus} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {OrderService} from '../order.service';
import {Order} from '../../apiEntities/order-entity.model';

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
    order: Order;
    id: number;
    subscription: Subscription;
    faEdit = faEdit;
    faTrash = faTrash;
    faEuroSign = faEuroSign;
    faBoxes = faBoxes;
    faMars = faMars;
    faVenus = faVenus;
    faBook = faBook;
    disabled: boolean;
    bookletText: string;


    constructor(
        private orderService: OrderService,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit(): void {

        this.subscription = this.orderService.ordersChanged.subscribe(
            (orders: Order[]) => {
                this.order = this.orderService.getOrder(this.id);
            }
        );

        this.route.params.subscribe(
            (params: Params) => {
                this.id = +params.id;
                this.order = this.orderService.getOrder(this.id);
                this.disabled = this.order.status;
            }
        );
    }


    onEditOrder() {
        this.router.navigate(['edit'], {relativeTo: this.route});
    }

    onDisableOrder() {
        this.orderService.disableOrder(this.id);
        this.router.navigate(['../']);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}

