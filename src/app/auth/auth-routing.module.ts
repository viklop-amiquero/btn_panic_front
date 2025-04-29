import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginPageComponent } from './pages/login-page/login-page.component'
import { RegisterPageComponent } from './pages/register-page/register-page.component'
import { RoutesName } from '../shared/routes/routes'
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component'
import { PasswordRecoverPageComponent } from './pages/password-recover-page/password-recover-page.component'

const routes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            { path: RoutesName.LOGIN.route, component: LoginPageComponent },
            {
                path: RoutesName.REGISTER.route,
                component: RegisterPageComponent,
            },
            {
                path: RoutesName.PASSWORD.route,
                component: PasswordRecoverPageComponent,
            },
            {
                path: '**',
                redirectTo: RoutesName.LOGIN.route,
                // redirectTo: 'login',
            },
        ],
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
