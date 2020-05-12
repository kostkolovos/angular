import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {Title} from '@angular/platform-browser';
import {environment} from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    favIcon: HTMLLinkElement = document.querySelector('#favIconHeader');

    constructor(private authService: AuthService, private titleService: Title) {
        this.favIcon.href = environment.favIconHeader;
    }

    ngOnInit(): void {
        this.authService.autoLogin();
        this.titleService.setTitle(environment.applicationTitle);
    }
}
