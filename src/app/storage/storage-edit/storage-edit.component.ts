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
                Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1OTY5OTY5NzAsImV4cCI6MTU5NzAwMDU3MCwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoibWF4aSJ9.WITtEJiXM-CSFP-TZjT-Eas7usWPXwYzPpZnfHuLfgSN9apwF-0o_w37BBWKqUvrmfn0r2Ce5SUMSlZmu1iPSEBI93BM8zDtJ8rAfuXg4mnA-X75O759Jef-IrSQxjdcLxyB5SVqfdzoPRUOr-snR5PAi71UzqhhtpfRjyUCbANXat2nmuiQ9Pwf_IXNhmyL6DXAhdYAc-QLUJfBDsWoEDZu-v0d8Se9HFOegJHCRG-6qwjaNtbCwEn4dnDo4eZPWL40XHY_eety_c54mPGw5kyNd_Ta8DzZBTJg-aS1lF8H6-v6nxXFjdpXIr4lGF2ZX2Y6FltLMrK7B-iT4rblIJd3FacYh-JSTY2iB0w-NYQ5BuhPeAbL8ztVVd2mKGXOeppSWsj2hMt0iuXqUhRsvdX2KAoW6CcBVW5tO8ACunw6FGAnS31pMry3-XOO-W84B4rvTr0__8PdgUzulpTfDAWzLFT3YzJE6qv1sbj7v4xIjk_DRpLNLkSrGDiDDNz9YOX6FjMoF45nNyxA9oPAdgpr1zyOdX9vYyyOPemitfyDtw0pDuydxPblFWa2ttXoG35AfC4dygLnoMRSHSQ6mqXJ2y5XvSXzOEbVD8zWVV6guhuE3yuA1xJFUKeCUezpa8iWDbdeRAz0NXovVjWv3Y_XyXltIGKSY3WdA48byz4'
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
