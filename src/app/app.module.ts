import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CoreModule} from './shared/core.module';
import {AppRoutingModule} from './routing/app-routing.module';
import {HeaderComponent} from './header/header.component';
import {HttpClientModule} from '@angular/common/http';
import { StorageComponent } from './storage/storage.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

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
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
