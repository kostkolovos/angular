import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownDirective} from './dropdown.directive';
import {StatusPipe} from './status.pipe';
import {LoaderComponent} from './loader/loader.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [DropdownDirective, StatusPipe, LoaderComponent],
    imports: [CommonModule],
    exports: [DropdownDirective, CommonModule, StatusPipe, LoaderComponent, FontAwesomeModule]
})
export class SharedModule {
}
