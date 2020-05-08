import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {StorageService} from '../storage.service';
import {faSave, faWindowClose} from '@fortawesome/free-solid-svg-icons';
import {StorageTypeService} from '../storage-type.service';
import {StorageTypes} from '../../apiEntities/storage-types-entity.model';

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
    storagePetTypeValue = 'StoragePetType';


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
            this.id = +params['id'];
            this.editMode = params['id'] != null;
            this.initForm();
        });
    }

    private initForm() {
        let storageTitle = '';
        let storageId = null;
        let storageDescription = '';
        let storagePieces = 0;
        let storagePrice = 0;
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
            storagePrice = storage.price;
            this.currentType = this.storageTypesApi.find(types => types.id === storage.storageTypes.id);
            defaultSelect = this.storageTypesApi.indexOf(this.currentType);

            if (storage['storagePetTypes'].length) {
                for (const storageItem of storage.storagePetTypes) {
                    storagePetType.push(
                        this.addFormGroupPetType(storageItem.microchip, storageItem.male, storageItem.female, storageItem.booklet)
                    );
                }
            } else {
                storagePetType.push(this.addFormGroupPetType());
            }

        } else {
            storagePetType.push(this.addFormGroupPetType());
        }

        this.storageForm = new FormGroup({
            title: new FormControl(storageTitle, Validators.required),
            id: new FormControl(storageId),
            description: new FormControl(storageDescription),
            pieces: new FormControl(storagePieces, Validators.required),
            price: new FormControl(storagePrice, Validators.required),
            storageTypes: new FormControl(this.storageTypesApi[defaultSelect], Validators.required),
            storagePetTypes: storagePetType
        });

        const storagePetTypesControl = this.storageForm.get('storagePetTypes') as FormArray;
        const microchipStoragePetTypesControl = storagePetTypesControl.controls.find(Boolean).get('microchip');

        this.storageForm.get('storageTypes').valueChanges.subscribe((val) => {
            this.currentType = val;
            if (this.currentType.title === this.storagePetTypeValue) {
                microchipStoragePetTypesControl.setValidators(Validators.required);
            } else {
                microchipStoragePetTypesControl.clearValidators();
            }
            microchipStoragePetTypesControl.updateValueAndValidity();
        });
    }


    onSubmit() {
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
        return (<FormArray> this.storageForm.get('storagePetTypes')).controls;
    }

    addFormGroupPetType(microchip = null, male = null, female = null, booklet = null) {

        return new FormGroup({
            microchip: new FormControl(microchip),
            male: new FormControl(male),
            female: new FormControl(female),
            booklet: new FormControl(booklet),
        });
    }
}
