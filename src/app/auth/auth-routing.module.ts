import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginPageComponent } from './pages/login-page/login-page.component'
import { RegisterPageComponent } from './pages/register-page/register-page.component'
import { RoutesName } from '../shared/routes/routes'

const routes: Routes = [
    {
        // path: 'login',
        path: RoutesName.LOGIN.route,
        component: LoginPageComponent,
    },
    {
        // path: 'register',
        path: RoutesName.REGISTER.route,
        component: RegisterPageComponent,
    },
    {
        path: '**',
        redirectTo: RoutesName.LOGIN.route,
        // redirectTo: 'login',
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
