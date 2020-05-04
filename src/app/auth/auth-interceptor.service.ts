import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {exhaustMap, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService.user.subscribe();
    return this.authService.user.pipe(
        /*count of the items you get and unsubscribe (only only once)*/
        take(1),
        /*Take on observable (take return user) and use it to return another one (the http)*/
        exhaustMap(user => {
          if (!user) {
            return next.handle(req);
          }
          const modifiedRequest = req.clone({headers: new HttpHeaders().set('Authorization', 'Bearer ' + user.token)});
          modifiedRequest.headers.append('Access-Control-Allow-Headers', 'Authorization');
          return next.handle(modifiedRequest);
        }));
  }
}
