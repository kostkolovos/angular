import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {faSave, faWindowClose} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {OrderService} from '../order.service';
import {StorageService} from '../../storage/storage.service';
import {Storage} from '../../apiEntities/storage-entity.model';
import {StorageTypeService} from '../../storage/storage-type.service';
import {StorageTypes} from '../../apiEntities/storage-types-entity.model';
import {StoragePetType} from '../../apiEntities/storage-pet-type-entity.model';

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
    storagePetTypeValue = this.storageTypeService.getStoragePetTypeValue();
    currentStorageTypes: StorageTypes[];

    constructor(
        private activatedRoute: ActivatedRoute,
        private orderService: OrderService,
        private router: Router,
        private route: ActivatedRoute,
        private storageService: StorageService,
        private storageTypeService: StorageTypeService
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
        let orderDescription = null;
        const orderStorageCalculatorsApi = new FormArray([]);
        let defaultSelect = null;
        const currentStorageTypes = [];
        let storagePetType: StoragePetType[];
        let customerFormGroup = this.addCustomerFormGroup();

        if (this.editMode) {
            const order = this.orderService.getOrder(this.id);
            orderId = order.id;
            orderDescription = order.description;
            customerFormGroup = this.addCustomerFormGroup(order.customer.id, order.customer.fullName, order.customer.mobile);

            if (order.orderStorageCalculators) {
                for (const orderStorageCalculatorItem of order.orderStorageCalculators) {
                    storagePetType = null;
                    const current = this.storageApi.find(types => types.id === orderStorageCalculatorItem.storage.id);
                    defaultSelect = this.storageApi.indexOf(current);
                    currentStorageTypes.push(current.storageTypes);

                    if (current.storageTypes.title === this.storagePetTypeValue) {
                        /*Only one value is expected*/
                        storagePetType = orderStorageCalculatorItem.storagePetType;
                    }

                    orderStorageCalculatorsApi.push(
                        this.addOrderStorageCalculatorsFormGroup(
                            orderStorageCalculatorItem.id,
                            orderStorageCalculatorItem.pieces,
                            defaultSelect,
                            storagePetType
                        ));
                }
            }
        } else {
            orderStorageCalculatorsApi.push(this.addOrderStorageCalculatorsFormGroup());
        }

        this.orderForm = new FormGroup({
            id: new FormControl(orderId),
            orderStorageCalculators: orderStorageCalculatorsApi,
            description: new FormControl(orderDescription),
            customer: customerFormGroup
        });

        this.currentStorageTypes = currentStorageTypes;
    }


    onSubmit() {
        if (this.editMode) {
            this.orderService.updateOrders(this.id, this.orderForm.getRawValue());
        } else {
            this.orderService.addOrders(this.orderForm.getRawValue());
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

    addOrderStorageCalculatorsFormGroup(id = null, pieces = null, defaultSelect = null, storagePetTypes: StoragePetType[] = null) {
        let storagePetTypeMale = null;
        let storagePetTypeFemale = null;
        let storagePetTypeId = null;
        const storagePetTypeArray = new FormArray([]);
        let disabledPieces = false;
        let piecesMax = null;
        let maleMax = null;
        let femaleMax = null;

        if (storagePetTypes) {
            /*Only on is expected*/
            const storagePetType = storagePetTypes.find(Boolean);
            storagePetTypeMale = storagePetType.male;
            storagePetTypeFemale = storagePetType.female;
            storagePetTypeId = storagePetType.id;
            disabledPieces = true;
        }

        if (defaultSelect !== null) {
            const storageDefaultSelect = this.storageApi[defaultSelect];
            piecesMax = storageDefaultSelect.pieces;

            if (storageDefaultSelect.storagePetTypes.length) {
                maleMax = storageDefaultSelect.storagePetTypes.find(Boolean).male;
                femaleMax = storageDefaultSelect.storagePetTypes.find(Boolean).female;
            }

        }

        storagePetTypeArray.push(new FormGroup({
            id: new FormControl(storagePetTypeId),
            male: new FormControl(storagePetTypeMale, [Validators.max(maleMax), Validators.min(0)]),
            female: new FormControl(storagePetTypeFemale, [Validators.max(femaleMax), Validators.min(0)])
        }));


        return new FormGroup({
            id: new FormControl(id),
            pieces: new FormControl({value: pieces, disabled: disabledPieces},
                [Validators.required, Validators.max(+piecesMax), Validators.min(0)]
            ),
            storage: new FormControl(this.storageApi[defaultSelect], Validators.required),
            storagePetType: storagePetTypeArray
        });
    }

    onChange(i: number) {
        const formArray = this.orderForm.get('orderStorageCalculators') as FormArray;
        const currentControl = formArray.controls[i];
        const object = currentControl.value;
        this.currentStorageTypes[i] = object.storage.storageTypes;
        currentControl.get('pieces').setValidators(Validators.max(object.storage.pieces));

        switch (object.storage.storageTypes.title) {
            case this.storagePetTypeValue:
                const menMax = object.storage.storagePetTypes.find(Boolean).male;
                const femaleMax = object.storage.storagePetTypes.find(Boolean).female;
                const storagePetTypeController = currentControl.get('storagePetType') as FormArray;
                const currentStoragePetType = storagePetTypeController.value.find(Boolean);
                const male = currentStoragePetType.male;
                const female = currentStoragePetType.female;

                storagePetTypeController.controls.find(Boolean).get('male').setValidators(Validators.max(menMax));
                storagePetTypeController.controls.find(Boolean).get('female').setValidators(Validators.max(femaleMax));
                currentControl.get('pieces').setValue(male + female);
                currentControl.get('pieces').disable();
                break;
            default:
                currentControl.get('pieces').enable();
                break;
        }
    }

    addCustomerFormGroup(id = null, fullName = null, mobile = null) {
        return new FormGroup({
            id: new FormControl(id),
            fullName: new FormControl(fullName),
            mobile: new FormControl(mobile)
        });
    }

}
