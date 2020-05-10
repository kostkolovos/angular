import {Component, OnInit} from '@angular/core';
import {faArrowCircleLeft} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-storage',
    templateUrl: './storage.component.html',
    styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {
    hasChanged = false;
    hideList: boolean;
    hideItems: boolean;
    mobile = false;
    faArrowCircleLeft = faArrowCircleLeft;

    constructor(private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        if (window.screen.width < 768 && !this.hasChanged) { // 768px portrait
            this.hideItems = true;
            this.hideList = false;
            this.mobile = true;
        } else if (window.screen.width < 768 && !this.hasChanged) {
            this.hideItems = false;
            this.hideList = false;
            this.mobile = true;
        }
    }


    onActivate(event: any) {
        const constructorName = event.constructor.name;

        if (window.screen.width < 768 && constructorName === 'StorageStartComponent') {
            this.hideItems = true;
            this.hideList = false;
            this.mobile = true;
        } else if (window.screen.width < 768 && constructorName !== 'StorageStartComponent') {
            this.hideItems = false;
            this.hideList = true;
            this.mobile = true;
        }

        this.hasChanged = true;
    }

    onDeactivate(event: any) {
        const constructorName = event.constructor.name;
        if (window.screen.width < 768 && constructorName === 'StorageStartComponent') {
            this.hideItems = true;
            this.hideList = false;
            this.mobile = true;
        }

        this.hasChanged = true;
    }

    onBackToStorageList() {
        this.router.navigate([''], {relativeTo: this.route});
    }

}
