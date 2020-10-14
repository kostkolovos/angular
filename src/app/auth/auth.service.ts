import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, throwError} from 'rxjs';
import {ApiToken} from '../apiEntities/api-token.model';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {UserService} from '../user/user.service';

interface LoginResponce {
    token: string;
    refresh_token: string;
}

interface SignUpResponce {
    id: string;
    roles: string[];
    username: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    apiToken = new BehaviorSubject<ApiToken>(null); // Subscribe in previews events like login and get token
    tokenExpirationTime: any;
    private hardCodeExpirationTimer = 3600000;

    constructor(private http: HttpClient, private router: Router, private userService: UserService) {
    }

    login(username: string, password: string) {
        return this.http.post<LoginResponce>(
            environment.apiUrl + 'authentication_token',
            {username, password}
        ).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.token, resData.refresh_token);
        }));
    }

    autoLogin() {
        const apiTokenData: { _token: string, _refreshToken: string } = JSON.parse(localStorage.getItem('token'));
        if (!apiTokenData) {
            return;
        }

        const loadedApiToken = new ApiToken(apiTokenData._token, apiTokenData._refreshToken);

        this.http.post<LoginResponce>(environment.apiUrl + 'refresh_token', {refresh_token: loadedApiToken.refreshToken}).subscribe(
            response => {
                loadedApiToken._refreshToken = response.refresh_token;
                loadedApiToken._token = response.token;
                localStorage.setItem('token', JSON.stringify(loadedApiToken));
            }, error => {
                if (error.error.code === 401) {
                    this.logout();
                }
            }
        );
        this.apiToken.next(loadedApiToken);
    }

    logout() {
        this.apiToken.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('token');
    }

    signUp(username: string, password: string) {
        return this.userService.addUser(username, password).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = 'loginError.unknownError';

        if (!errorResponse.error) {
            return throwError(errorMessage);
        }

        switch (errorResponse.error.message) {
            case 'Invalid credentials.':
                errorMessage = 'loginError.validCredentials';
                break;
            case 'Account is disabled.':
                errorMessage = 'loginError.disabledAccount';
                break;
        }

        return throwError(errorMessage);
    }

    private handleAuthentication(token: string, refreshToken: string) {
        const apiToken = new ApiToken(token, refreshToken);
        this.apiToken.next(apiToken);
        localStorage.setItem('token', JSON.stringify(apiToken));
    }
}
