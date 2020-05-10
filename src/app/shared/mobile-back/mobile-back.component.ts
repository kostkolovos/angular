import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {faArrowCircleLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-mobile-back',
    templateUrl: './mobile-back.component.html',
    styleUrls: ['./mobile-back.component.css']
})
export class MobileBackComponent implements OnInit {
    @Input() mobile: boolean;
    faArrowCircleLeft = faArrowCircleLeft;

    constructor(private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
    }


    onBackToStorageList() {
        this.router.navigate([''], {relativeTo: this.route});
    }

}
