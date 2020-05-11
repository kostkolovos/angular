import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {faSave, faWindowClose} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {OrderService} from '../order.service';

@Component({
    selector: 'app-order-edit',
    templateUrl: './order-edit.component.html',
    styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {
    id: number;
    editMode = false;
    orderForm: FormGroup;
    faSave = faSave;
    faWindowClose = faWindowClose;

    constructor(
        private activatedRoute: ActivatedRoute,
        private orderService: OrderService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.id = +params.id;
            this.editMode = params.id != null;
            this.initForm();
        });
    }

    private initForm() {
        let orderId = null;
        const orderStorages = new FormArray([]);

        if (this.editMode) {
            const order = this.orderService.getOrder(this.id);
            orderId = order.id;

            if (order.storage) {
                console.log(order.storage);
                for (const storageItem of order.storage) {
                    orderStorages.push(
                        new FormGroup({
                            title: new FormControl(storageItem.title, Validators.required)
                        })
                    );
                }
            }

        }

        this.orderForm = new FormGroup({
            id: new FormControl(orderId),
            storage: orderStorages
        });
    }


    onSubmit() {
        if (this.editMode) {
            this.orderService.updateOrders(this.id, this.orderForm.value);
        } else {
            this.orderService.addOrders(this.orderForm.value);
        }

        this.onCancel();
    }

    onCancel() {
        this.router.navigate(['order'], {relativeTo: this.route});
    }

    get controls() { // a getter!
        const formArray = this.orderForm.get('storages') as FormArray;
        return formArray.controls;
    }

    onAddStorage() {
        (this.orderForm.get('storages') as FormArray).push(
            new FormGroup({
                title: new FormControl(null, Validators.required)
            })
        );
    }

}
