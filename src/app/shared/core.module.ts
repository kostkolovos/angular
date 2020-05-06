import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptorService} from '../auth/auth-interceptor.service';
import {LoaderInterceptorService} from './loader/loader-interceptor.service';

@NgModule({
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true}
    ]
})
export class CoreModule {
}
