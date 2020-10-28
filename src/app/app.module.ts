import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CoreModule} from './shared/core.module';
import {AppRoutingModule} from './routing/app-routing.module';
import {HeaderComponent} from './header/header.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {StorageComponent} from './storage/storage.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {StorageModule} from './storage/storage.module';
import {SharedModule} from './shared/shared.module';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {AngularFireMessagingModule} from '@angular/fire/messaging';
import {AngularFireModule} from '@angular/fire';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        StorageComponent
    ],
    imports: [
        BrowserModule,
        CoreModule,
        AppRoutingModule,
        HttpClientModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        StorageModule,
        SharedModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireMessagingModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    exports: [TranslateModule]
})
export class AppModule {
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient);
}
