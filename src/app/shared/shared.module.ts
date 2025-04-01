import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { HeaderComponent } from './components/header/header.component'
import { FooterComponent } from './components/footer/footer.component'
import { SideMenuComponent } from './components/side-menu/side-menu.component'
import { RouterModule } from '@angular/router'

@NgModule({
    declarations: [HeaderComponent, SideMenuComponent, FooterComponent],
    imports: [CommonModule, IonicModule, RouterModule],
    exports: [HeaderComponent, FooterComponent, SideMenuComponent],
})
export class SharedModule {}
