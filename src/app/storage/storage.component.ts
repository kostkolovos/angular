import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-storage',
    templateUrl: './storage.component.html',
    styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {
    hasChanged = false;
    hideList: boolean;
    hideItems: boolean;

    constructor() {
    }

    ngOnInit(): void {
        if (window.screen.width < 768 && !this.hasChanged) { // 768px portrait
            this.hideItems = true;
            this.hideList = false;
        } else if (window.screen.width < 768 && !this.hasChanged) {
            this.hideItems = false;
            this.hideList = false;
        }
    }


    onActivate(event: any) {
        const constructorName = event.constructor.name;

        if (window.screen.width < 768 && constructorName === 'StorageStartComponent') {
            this.hideItems = true;
            this.hideList = false;
        } else if (window.screen.width < 768 && constructorName !== 'StorageStartComponent') {
            this.hideItems = false;
            this.hideList = true;
        }

        this.hasChanged = true;
    }

    onDeactivate(event: any) {
        const constructorName = event.constructor.name;
        if (window.screen.width < 768 && constructorName === 'StorageStartComponent') {
            this.hideItems = true;
            this.hideList = false;
        }

        this.hasChanged = true;
    }

}
