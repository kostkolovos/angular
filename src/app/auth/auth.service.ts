import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, throwError} from 'rxjs';
import {User} from '../apiEntities/api-token.model';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

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

    user = new BehaviorSubject<User>(null); // Subscribe in previews events like login and get token
    tokenExpirationTime: any;
    private hardCodeExpirationTimer = 3600000;

    constructor(private http: HttpClient, private router: Router) {
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
        const userData: { _token: string, _refreshToken: string } = JSON.parse(localStorage.getItem('token'));
        if (!userData) {
            return;
        }

        const loadedUser = new User(userData._token, userData._refreshToken);

        this.http.post<LoginResponce>(environment.apiUrl + 'refresh_token', {refresh_token: loadedUser.refreshToken}).subscribe(
            response => {
                loadedUser._refreshToken = response.refresh_token;
                loadedUser._token = response.token;
                localStorage.setItem('token', JSON.stringify(loadedUser));
            }, error => {
                if (error.error.code === 401) {
                    this.logout();
                }
            }
        );
        this.user.next(loadedUser);
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('token');
    }

    signUp(username: string, password: string) {
        return this.http.post<SignUpResponce>(
            environment.apiUrl + 'api/users',
            {username, password}
        ).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = 'Unknown Error!';

        if (!errorResponse.error) {
            return throwError(errorMessage);
        }

        switch (errorResponse.error.message) {
            case 'Invalid credentials.':
                errorMessage = 'Please provide valid credentials';
                break;
            case 'Account is disabled.':
                errorMessage = 'Account is disabled, please contact the admin.';
                break;
        }

        return throwError(errorMessage);
    }

    private handleAuthentication(token: string, refreshToken: string) {
        const user = new User(token, refreshToken);
        this.user.next(user);
        localStorage.setItem('token', JSON.stringify(user));
    }
}
