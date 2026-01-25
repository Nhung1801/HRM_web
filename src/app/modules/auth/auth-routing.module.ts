import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'error',
                loadChildren: () =>
                    import('./error/error.module').then((m) => m.ErrorModule),
            },
            {
                path: 'login',
                component:LoginComponent
            },
            {
                path: 'recover-password',
                component:RecoverPasswordComponent
            },
            {
                path: 'set-password',
                component:SetPasswordComponent
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
