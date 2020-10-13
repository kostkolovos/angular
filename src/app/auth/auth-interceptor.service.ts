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
        this.authService.apiToken.subscribe();
        return this.authService.apiToken.pipe(
            /*count of the items you get and unsubscribe (only only once)*/
            take(1),
            /*Take on observable (take return api token) and use it to return another one (the http)*/
            exhaustMap(apiToken => {
                if (!apiToken) {
                    return next.handle(req);
                }
                const modifiedRequest = req.clone({headers: new HttpHeaders().set('Authorization', 'Bearer ' + apiToken.token)});
                modifiedRequest.headers.append('Access-Control-Allow-Headers', 'Authorization');
                return next.handle(modifiedRequest);
            }));
    }
}
