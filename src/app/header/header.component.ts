import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';
import {faWarehouse, faSignOutAlt, faSignInAlt, faShippingFast} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
    collapsed = true;
    private userSubscribe: Subscription;
    isAuthenticated = false;
    faWarehouse = faWarehouse;
    faSignOutAlt = faSignOutAlt;
    faSignInAlt = faSignInAlt;
    faShippingFast = faShippingFast;

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        this.userSubscribe = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;
        });
    }

    ngOnDestroy(): void {
        this.userSubscribe.unsubscribe();
    }

    onLogout() {
        this.collapsed = true;
        this.authService.logout();
    }
}
