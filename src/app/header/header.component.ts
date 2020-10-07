import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';
import {faWarehouse, faSignOutAlt, faSignInAlt, faShippingFast, faCashRegister} from '@fortawesome/free-solid-svg-icons';
import {environment} from '../../environments/environment';
import {TranslateService} from '@ngx-translate/core';

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
    faCashRegister = faCashRegister;
    applicationTitle = environment.applicationTitle;

    constructor(private authService: AuthService, public translate: TranslateService) {
        translate.addLangs(['gr']);
        translate.setDefaultLang('gr');

        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/gr/) ? browserLang : 'eg');
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
