import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../auth/auth.guard';

const appRoutes: Routes = [
    {path: '', redirectTo: '/storage', pathMatch: 'full', canActivate: [AuthGuard]},
    {path: 'storage', loadChildren: () => import('../storage/storage.module').then(m => m.StorageModule)},
    {path: 'auth', loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule)},
    {path: 'order', loadChildren: () => import('../order/order.module').then(m => m.OrderModule)},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
