import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {DropdownDirective} from './dropdown.directive';
import {StatusPipe} from './status.pipe';

@NgModule({
    declarations: [LoadingSpinnerComponent, DropdownDirective, StatusPipe],
    imports: [CommonModule],
    exports: [LoadingSpinnerComponent, DropdownDirective, CommonModule, StatusPipe]
})
export class SharedModule {
}
