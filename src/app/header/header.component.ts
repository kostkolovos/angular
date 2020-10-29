import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';
import {faWarehouse, faSignOutAlt, faSignInAlt, faCashRegister} from '@fortawesome/free-solid-svg-icons';
import {environment} from '../../environments/environment';
import {TranslateService} from '@ngx-translate/core';
import {UserService} from '../user/user.service';
import {User} from '../apiEntities/user-entity.model';

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
    faCashRegister = faCashRegister;
    applicationTitle = environment.applicationTitle;
    userLanguageSubscription: Subscription;

    constructor(
        private authService: AuthService,
        public translate: TranslateService,
        public userService: UserService
    ) {
        translate.addLangs(['eg', 'gr', 'en']);
        translate.setDefaultLang('gr');
        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/gr|eg|en/) ? browserLang : 'gr');
    }

    ngOnInit(): void {
        this.apiTokenSubscribe = this.authService.apiToken.subscribe(apiToken => {
            this.isAuthenticated = !!apiToken;
            if (this.isAuthenticated) {
                this.userService.getUser();
            }
        });

        this.userLanguageSubscription = this.userService.userChanged.subscribe((user: User) => {
                this.translate.use(user.language);
            }
        );
    }

    ngOnDestroy(): void {
        this.apiTokenSubscribe.unsubscribe();
        this.userLanguageSubscription.unsubscribe();
    }

    onLogout() {
        this.collapsed = true;
        this.authService.logout();
    }
}
