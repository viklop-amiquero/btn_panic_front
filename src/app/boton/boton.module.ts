import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { IonicModule } from '@ionic/angular'

import { BotonRoutingModule } from './boton-routing.module'
import { HomePageComponent } from './pages/home-page/home-page.component'
import { BtnPanicComponent } from './components/btn-panic/btn-panic.component'
import { SharedModule } from '../shared/shared.module'

@NgModule({
    declarations: [HomePageComponent, BtnPanicComponent],
    imports: [CommonModule, BotonRoutingModule, SharedModule, IonicModule],
})
export class BotonModule {}
