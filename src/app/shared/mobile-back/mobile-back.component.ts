import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {faArrowCircleLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-mobile-back',
    templateUrl: './mobile-back.component.html',
    styleUrls: ['./mobile-back.component.css']
})
export class MobileBackComponent implements OnInit {
    mobile: boolean;
    faArrowCircleLeft = faArrowCircleLeft;

    constructor(private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        if (window.screen.width < 768) {
            this.mobile = true;
        }
    }


    onBackToStorageList() {
        this.router.navigate(['./'], {relativeTo: this.route});
    }

}
