import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownDirective} from './dropdown.directive';
import {StatusPipe} from './status.pipe';
import {LoaderComponent} from './loader/loader.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MobileBackComponent} from './mobile-back/mobile-back.component';
import {TranslateModule} from '@ngx-translate/core';
import {ProgressPipe} from './progress.pipe';

@NgModule({
    imports: [CommonModule, FontAwesomeModule, TranslateModule],
    declarations: [DropdownDirective, StatusPipe, LoaderComponent, MobileBackComponent, ProgressPipe],
    exports: [
        DropdownDirective, CommonModule, StatusPipe, LoaderComponent, FontAwesomeModule, MobileBackComponent, TranslateModule, ProgressPipe
    ]
})
export class SharedModule {
}
