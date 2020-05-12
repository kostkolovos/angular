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
        const orderStorages = new FormArray([]);

        if (this.editMode) {
            const order = this.orderService.getOrder(this.id);
            orderId = order.id;

            if (order.storage) {
                for (const storageItem of order.storage) {
                    const current = this.storageApi.find(types => types.id === storageItem.id);
                    const defaultSelect = this.storageApi.indexOf(current);
                    orderStorages.push(this.addStoragesFormCotrols(defaultSelect));
                }
            } else {
                orderStorages.push(this.addStoragesFormCotrols());
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
        this.router.navigate(['../'], {relativeTo: this.route});
    }

    get controls() { // a getter!
        const formArray = this.orderForm.get('storage') as FormArray;
        return formArray.controls;
    }

    onAddStorage() {
        (this.orderForm.get('storage') as FormArray).push(this.addStoragesFormCotrols());
    }

    onDeleteStorage(i: number) {
        const formArray = this.orderForm.get('storage') as FormArray;
        formArray.removeAt(i);
    }

    addStoragesFormCotrols(defaultSelect = null) {
        return new FormControl(this.storageApi[defaultSelect], Validators.required);
    }

}
