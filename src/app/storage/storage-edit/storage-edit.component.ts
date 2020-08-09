import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {StorageService} from '../storage.service';
import {faSave, faWindowClose} from '@fortawesome/free-solid-svg-icons';
import {StorageTypeService} from '../storage-type.service';
import {StorageTypes} from '../../apiEntities/storage-types-entity.model';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-storage-edit',
    templateUrl: './storage-edit.component.html',
    styleUrls: ['./storage-edit.component.css']
})
export class StorageEditComponent implements OnInit {
    id: number;
    editMode = false;
    storageForm: FormGroup;
    faSave = faSave;
    faWindowClose = faWindowClose;
    storageTypesApi: StorageTypes[];
    currentType: StorageTypes;
    storagePetTypeValue = this.storageTypeService.getStoragePetTypeValue();
    bookletStates = this.storageTypeService.getBookletValues();
    defaultBookletStates = null;
    afuConfig = {
        multiple: true,
        formatsAllowed: '.jpg,.png',
        maxSize: '3',
        uploadAPI: {
            url: environment.apiUrl + 'api/media_objects',
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=UTF-8',
                Authorization: 'Bearer ' /** TODO get token*/
            },
            /*params: {
                page: '1'
            },*/
            responseType: 'blob',
        },
        theme: 'dragNDrop',
        hideProgressBar: false,
        hideResetBtn: false,
        hideSelectBtn: false,
        fileNameIndex: false,
        replaceTexts: {
            selectFileBtn: 'Διαλέξτε εικόνες',
            resetBtn: 'Επαναφορά',
            uploadBtn: 'Ανέβασμα εικόνων',
            dragNDropBox: 'Σύρετε και Αφήστε',
            attachPinBtn: 'Επισύναψη Αρχείων...',
            afterUploadMsg_success: 'Ανέβηκε επιτυχώς !',
            afterUploadMsg_error: 'Σφάλμα ανεβάσματος !',
            sizeLimit: 'Όριο μεγέθους εικόνων'
        }
    };
    resetVar = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private storageService: StorageService,
        private storageTypeService: StorageTypeService,
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
        let storageTitle = '';
        let storageId = null;
        let storageDescription = '';
        let storagePieces = 0;
        let storagePrice = null;
        this.storageTypesApi = this.storageTypeService.getstorageTypes();
        this.currentType = this.storageTypesApi.find(types => types.sort === 1);
        let defaultSelect = this.storageTypesApi.indexOf(this.currentType);
        const storagePetType = new FormArray([]);

        if (this.editMode) {
            const storage = this.storageService.getStorage(this.id);
            storageId = storage.id;
            storageTitle = storage.title;
            storageDescription = storage.description;
            storagePieces = storage.pieces;
            storagePrice = this.addPriceFormGroup(
                storage.price.id,
                storage.price.total,
                storage.price.initial,
                storage.price.profit,
                storage.price.shipping
            );
            this.currentType = this.storageTypesApi.find(types => types.id === storage.storageTypes.id);
            defaultSelect = this.storageTypesApi.indexOf(this.currentType);

            if (storage.storagePetTypes.length) {
                for (const storageItem of storage.storagePetTypes) {
                    this.defaultBookletStates = storageItem.booklet;
                    storagePetType.push(
                        this.addFormGroupPetType(storageItem.microchip, storageItem.male, storageItem.female, storageItem.booklet)
                    );
                }
            } else {
                storagePetType.push(this.addFormGroupPetType());
            }

        } else {
            storagePrice = this.addPriceFormGroup();
            storagePetType.push(this.addFormGroupPetType());
        }

        this.storageForm = new FormGroup({
            title: new FormControl(storageTitle, Validators.required),
            id: new FormControl(storageId),
            description: new FormControl(storageDescription),
            pieces: new FormControl(storagePieces, [Validators.required, Validators.min(0)]),
            price: storagePrice,
            storageTypes: new FormControl(this.storageTypesApi[defaultSelect], Validators.required),
            storagePetTypes: storagePetType
        });

        const storagePetTypesControl = this.storageForm.get('storagePetTypes') as FormArray;
        const microchipStoragePetTypesControl = storagePetTypesControl.controls.find(Boolean).get('microchip');

        /*On change type*/
        this.storageForm.get('storageTypes').valueChanges.subscribe((val) => {
            this.currentType = val;

            switch (this.currentType.title) {
                case this.storagePetTypeValue:
                    this.storagePetTypePetHandler(storagePetTypesControl);
                    break;
                default:
                    microchipStoragePetTypesControl.clearValidators();
                    this.storageForm.get('pieces').enable();
                    break;
            }
            microchipStoragePetTypesControl.updateValueAndValidity();
        });
        /*On change type*/

        /*On load type*/
        if (this.currentType.title === this.storagePetTypeValue) {
            this.storagePetTypePetHandler(storagePetTypesControl);
        }
        /*On load type*/
    }


    onSubmit() {
        this.checkBeforeSubmit();
        if (this.editMode) {
            this.storageService.updateStorages(this.id, this.storageForm.value);
        } else {
            this.storageService.addStorages(this.storageForm.value);
        }

        this.onCancel();
    }

    onCancel() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }


    get controls() { // a getter!
        const formArray = this.storageForm.get('storagePetTypes') as FormArray;
        return formArray.controls;
    }

    addFormGroupPetType(microchip = null, male = 0, female = 0, booklet = null) {

        return new FormGroup({
            microchip: new FormControl(microchip),
            male: new FormControl(male, Validators.min(0)),
            female: new FormControl(female, Validators.min(0)),
            booklet: new FormControl(booklet),
        });
    }

    checkBeforeSubmit() {
        switch (this.currentType.title) {
            case this.storagePetTypeValue:
                this.storageForm.get('pieces').enable();
                break;
            default:
                this.storageForm.get('storagePetTypes').disable();
                break;
        }
    }

    storagePetTypePetHandler(storagePetTypesControl: FormArray) {

        const maleStoragePetTypesControl = storagePetTypesControl.controls.find(Boolean).get('male');
        const femaleStoragePetTypesControl = storagePetTypesControl.controls.find(Boolean).get('female');
        const piecesControl = this.storageForm.get('pieces');

        storagePetTypesControl.controls.find(Boolean).get('microchip').setValidators(Validators.required);
        piecesControl.disable();
        maleStoragePetTypesControl.valueChanges.forEach((value: number) => {
            piecesControl.setValue(maleStoragePetTypesControl.value + femaleStoragePetTypesControl.value);
        });
        femaleStoragePetTypesControl.valueChanges.forEach((value: number) => {
            piecesControl.setValue(maleStoragePetTypesControl.value + femaleStoragePetTypesControl.value);
        });

    }

    typeText(title) {
        return this.storageTypeService.getTypeValue(title);
    }

    addPriceFormGroup(id = null, total = null, initial = null, profit = null, shipping = null) {
        return new FormGroup({
            id: new FormControl(id),
            total: new FormControl({value: total, disabled: true}),
            initial: new FormControl(initial),
            profit: new FormControl(profit),
            shipping: new FormControl(shipping)
        });
    }

    onChangePrice() {
        const price = this.storageForm.get('price');
        price.get('total').setValue(price.get('initial').value + price.get('profit').value);
    }

    imageUpload(event) {
        console.log(event);
        // get response from api
    }

}
