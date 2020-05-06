import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {DropdownDirective} from './dropdown.directive';
import {StatusPipe} from './status.pipe';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
    declarations: [LoadingSpinnerComponent, DropdownDirective, StatusPipe, LoaderComponent],
    imports: [CommonModule],
    exports: [LoadingSpinnerComponent, DropdownDirective, CommonModule, StatusPipe, LoaderComponent]
})
export class SharedModule {
}
