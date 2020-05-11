import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
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
        const hasException = event.hasOwnProperty('hiddenException');

        if (window.screen.width < 768 && hasException) {
            this.hideItems = true;
            this.hideList = false;
        } else if (window.screen.width < 768 && !hasException) {
            this.hideItems = false;
            this.hideList = true;
        }

        this.hasChanged = true;
    }

    onDeactivate(event: any) {
        const hasException = event.hasOwnProperty('hiddenException');
        if (window.screen.width < 768 && hasException) {
            this.hideItems = true;
            this.hideList = false;
        }

        this.hasChanged = true;
    }
}

