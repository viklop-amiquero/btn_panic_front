import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomePageComponent } from './pages/home-page/home-page.component'
import { ProfilePageComponent } from './pages/profile-page/profile-page.component'

const routes: Routes = [
    {
        path: '',
        // component: HomePage,
        component: HomePageComponent,
    },
    {
        path: 'profile',
        component: ProfilePageComponent,
    },
    {
        path: '**',
        redirectTo: '',
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BotonRoutingModule {}
