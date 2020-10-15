import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth/auth.guard';
import {StorageComponent} from '../storage/storage.component';
import {StorageStartComponent} from '../storage/storage-start/storage-start.component';
import {StorageResolverService} from '../storage/storage-resolver.service';
import {StorageDetailsComponent} from '../storage/storage-details/storage-details.component';
import {StorageEditComponent} from '../storage/storage-edit/storage-edit.component';
import {StorageTypeResolverService} from '../storage/storage-type-resolver.service';

const routes: Routes = [{
    path: '',
    component: StorageComponent,
    canActivate: [AuthGuard],
    children: [
        {path: '', component: StorageStartComponent, resolve: [StorageResolverService]},
        {path: 'new', component: StorageEditComponent, resolve: [StorageResolverService, StorageTypeResolverService]},
        {path: ':id', component: StorageDetailsComponent, resolve: [StorageResolverService]},
        {path: ':id/edit', component: StorageEditComponent, resolve: [StorageResolverService, StorageTypeResolverService]},
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StorageRoutingModule {
}
