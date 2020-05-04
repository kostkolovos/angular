import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CoreModule} from './core.module';
import {AppRoutingModule} from './routing/app-routing.module';
import {HeaderComponent} from './header/header.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent
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
