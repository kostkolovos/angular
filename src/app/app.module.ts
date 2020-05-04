import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CoreModule} from './shared/core.module';
import {AppRoutingModule} from './routing/app-routing.module';
import {HeaderComponent} from './header/header.component';
import {HttpClientModule} from '@angular/common/http';
import { StorageComponent } from './storage/storage.component';

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
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
