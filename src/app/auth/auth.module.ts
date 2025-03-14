import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AuthRoutingModule } from './auth-routing.module'
import { RegisterPageComponent } from './pages/register-page/register-page.component'
import { LoginPageComponent } from './pages/login-page/login-page.component'
import { ReactiveFormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular'

@NgModule({
    declarations: [RegisterPageComponent, LoginPageComponent],
    imports: [
        CommonModule,
        AuthRoutingModule,
        IonicModule,
        ReactiveFormsModule,
    ],
})
export class AuthModule {}
