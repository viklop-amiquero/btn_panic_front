import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AuthRoutingModule } from './auth-routing.module'
import { RegisterPageComponent } from './pages/register-page/register-page.component'
import { LoginPageComponent } from './pages/login-page/login-page.component'
import { ReactiveFormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'
import { HeaderAuthComponent } from './components/header-auth/header-auth.component'
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component'
import { PasswordRecoverPageComponent } from './pages/password-recover-page/password-recover-page.component'
import { InfoDvComponent } from './components/info-dv/info-dv.component'

@NgModule({
    declarations: [
        RegisterPageComponent,
        LoginPageComponent,
        PasswordRecoverPageComponent,
        InfoDvComponent,
        HeaderAuthComponent,
        AuthLayoutComponent,
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        IonicModule,
        ReactiveFormsModule,
    ],
})
export class AuthModule {}
