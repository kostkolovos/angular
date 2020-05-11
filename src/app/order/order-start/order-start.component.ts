import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-order-start',
    templateUrl: './order-start.component.html',
    styleUrls: ['./order-start.component.css']
})
export class OrderStartComponent implements OnInit {
    hiddenException = true;

    constructor() {
    }

    ngOnInit(): void {
    }

}
