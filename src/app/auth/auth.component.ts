import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

    isLoginMode = true;
    isLoading = false;
    error: string = null;
    private closeSub: Subscription;

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
    }

    onSubmit(authForm: NgForm) {
        if (!authForm.valid) {
            return;
        }

        const username = authForm.value.username;
        const password = authForm.value.password;
        let authObs: Observable<any>;

        this.isLoading = true;
        if (this.isLoginMode) {
            authObs = this.auth.login(username, password);
        } else {
            authObs = this.auth.signUp(username, password);
        }

        authObs.subscribe(resData => {
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        }, errorMessage => {
            this.error = errorMessage;
            this.isLoading = false;
        });

        authForm.reset();
    }

}
