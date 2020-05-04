import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, throwError} from 'rxjs';
import {User} from './user.model';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

interface LoginResponce {
  token: string;
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

  user = new BehaviorSubject<User>(null); // Subscribe in previes events like login and get token
  tokenExpirationTime: any;
  private hardCodeExpirationTimer = 3600000;

  constructor(private http: HttpClient, private router: Router) {
  }

  login(username: string, password: string) {
    return this.http.post<LoginResponce>(
        environment.apiUrl + 'authentication_token',
        {username, password}
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.token);
    }));
  }

  autoLogin() {
    const userData: { _token: string } = JSON.parse(localStorage.getItem('token'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(userData._token);

    if (loadedUser.token) {
      this.user.next(loadedUser);
      this.autoLogout(this.hardCodeExpirationTimer);
    }

  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('token');

    if (this.tokenExpirationTime) {
      clearTimeout(this.tokenExpirationTime);
    }

  }

  autoLogout(expirationTime: number) {
    this.tokenExpirationTime = setTimeout(() => {
      this.logout();
    }, expirationTime);
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

  private handleAuthentication(token: string) {
    const user = new User(token);
    this.user.next(user);
    this.autoLogout(this.hardCodeExpirationTimer);
    localStorage.setItem('token', JSON.stringify(user));
  }
}
