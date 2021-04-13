import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
    { path: 'user', loadChildren: () => import('./feature/components/user/user.module').then(m => m.UserModule) },
    { path: '**', redirectTo:'user' }
];



@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule { }