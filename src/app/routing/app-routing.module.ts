import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
    {path: '', redirectTo: '/storage', pathMatch: 'full'},
    {path: 'storage', loadChildren: () => import('../storage/storage.module').then(m => m.StorageModule)},
    {path: 'auth', loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule)},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
