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

    constructor(private authService: AuthService, private titleService: Title) {
    }

    ngOnInit(): void {
        this.authService.autoLogin();
        this.titleService.setTitle(environment.applicationTitle);
    }
}
