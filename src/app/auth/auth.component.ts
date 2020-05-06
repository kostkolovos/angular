import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {faUserPlus, faSignInAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

    isLoginMode = true;
    error: string = null;
    private closeSub: Subscription;
    icon = faSignInAlt;
    reverseIcon = faUserPlus;

    constructor(private auth: AuthService, private router: Router) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
        const oldReveseIcon = this.reverseIcon;
        this.reverseIcon = this.icon;
        this.icon = oldReveseIcon;
    }

    onSubmit(authForm: NgForm) {
        if (!authForm.valid) {
            return;
        }

        const username = authForm.value.username;
        const password = authForm.value.password;
        let authObs: Observable<any>;

        if (this.isLoginMode) {
            authObs = this.auth.login(username, password);
        } else {
            authObs = this.auth.signUp(username, password);
        }

        authObs.subscribe(resData => {
            this.router.navigate(['/storage']);
        }, errorMessage => {
            this.error = errorMessage;
        });

        authForm.reset();
    }

}
