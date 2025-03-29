import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'

import { IonicModule } from '@ionic/angular'
import { ReactiveFormsModule } from '@angular/forms'

import { BotonRoutingModule } from './boton-routing.module'
import { HomePageComponent } from './pages/home-page/home-page.component'
import { BtnPanicComponent } from './components/btn-panic/btn-panic.component'
import { SharedModule } from '../shared/shared.module'
import { ProfilePageComponent } from './pages/profile-page/profile-page.component'
import { ListReportsPageComponent } from './pages/list-reports-page/list-reports-page.component'
import { MainLayoutComponent } from './layout/main-layout/main-layout.component'

@NgModule({
    declarations: [
        MainLayoutComponent,
        HomePageComponent,
        ProfilePageComponent,
        ListReportsPageComponent,
        BtnPanicComponent,
    ],
    imports: [
        CommonModule,
        BotonRoutingModule,
        SharedModule,
        IonicModule,
        ReactiveFormsModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BotonModule {}
