import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {faSave, faWindowClose} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {OrderService} from '../order.service';
import {StorageService} from '../../storage/storage.service';
import {Storage} from '../../apiEntities/storage-entity.model';

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
    storageApi: Storage[];

    constructor(
        private activatedRoute: ActivatedRoute,
        private orderService: OrderService,
        private router: Router,
        private route: ActivatedRoute,
        private storageService: StorageService
    ) {
    }

    ngOnInit(): void {
        this.storageApi = this.storageService.getAvailableStorages();
        this.activatedRoute.params.subscribe((params: Params) => {
            this.id = +params.id;
            this.editMode = params.id != null;
            this.initForm();
        });
    }

    private initForm() {
        let orderId = null;
        const orderStorageCalculatorsApi = new FormArray([]);
        let defaultSelect = null;

        if (this.editMode) {
            const order = this.orderService.getOrder(this.id);
            orderId = order.id;

            if (order.orderStorageCalculators) {
                for (const orderStorageCalculatorItem of order.orderStorageCalculators) {
                    const current = this.storageApi.find(types => types.id === orderStorageCalculatorItem.storage.id);
                    defaultSelect = this.storageApi.indexOf(current);

                    orderStorageCalculatorsApi.push(
                        new FormGroup({
                            id: new FormControl(orderStorageCalculatorItem.id),
                            pieces: new FormControl(orderStorageCalculatorItem.pieces, Validators.required),
                            storage: new FormControl(this.storageApi[defaultSelect], Validators.required)
                        })
                    );
                }
            }

        }

        this.orderForm = new FormGroup({
            id: new FormControl(orderId),
            orderStorageCalculators: orderStorageCalculatorsApi
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
        this.router.navigate(['../'], {relativeTo: this.route});
    }

    get orderStorageCalculators() {
        const formArray = this.orderForm.get('orderStorageCalculators') as FormArray;
        return formArray.controls;
    }

    onAddOrderStorageCalculators() {
        (this.orderForm.get('orderStorageCalculators') as FormArray).push(this.addOrderStorageCalculatorsFormGroup());
    }

    onDeleteOrderStorageCalculators(i: number) {
        const formArray = this.orderForm.get('orderStorageCalculators') as FormArray;
        formArray.removeAt(i);
    }

    addOrderStorageCalculatorsFormGroup(id = null, pieces = null, defaultSelect = null) {
        return new FormGroup({
            id: new FormControl(id),
            pieces: new FormControl(pieces, Validators.required),
            storage: new FormControl(this.storageApi[defaultSelect], Validators.required)
        });
    }

}
