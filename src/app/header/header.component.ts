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
    private apiTokenSubscribe: Subscription;
    isAuthenticated = false;
    faWarehouse = faWarehouse;
    faSignOutAlt = faSignOutAlt;
    faSignInAlt = faSignInAlt;
    faShippingFast = faShippingFast;
    faCashRegister = faCashRegister;
    applicationTitle = environment.applicationTitle;

    constructor(private authService: AuthService, public translate: TranslateService) {
        translate.addLangs(['eg', 'gr', 'en']);
        translate.setDefaultLang('eg');

        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/gr|eg|en/) ? browserLang : 'eg');
    }

    ngOnInit(): void {
        this.apiTokenSubscribe = this.authService.apiToken.subscribe(apiToken => {
            this.isAuthenticated = !!apiToken;
        });
    }

    ngOnDestroy(): void {
        this.apiTokenSubscribe.unsubscribe();
    }

    onLogout() {
        this.collapsed = true;
        this.authService.logout();
    }
}
