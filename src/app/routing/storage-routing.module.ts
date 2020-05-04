import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth/auth.guard';
import {StorageComponent} from '../storage/storage.component';
import {StorageStartComponent} from '../storage/storage-start/storage-start.component';

const routes: Routes = [{
    path: '',
    component: StorageComponent,
    canActivate: [AuthGuard],
    children: [
        {path: '', component: StorageStartComponent},
        /*{path: 'new', component: RecipeEditComponent},
        {path: ':id', component: RecipeDetailsComponent, resolve: [RecipesResolverService]},
        {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]},*/
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StorageRoutingModule {
}
