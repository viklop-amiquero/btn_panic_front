import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomePageComponent } from './pages/home-page/home-page.component'
import { ProfilePageComponent } from './pages/profile-page/profile-page.component'
import { RoutesName } from '../shared/routes/routes'
import { ListReportsPageComponent } from './pages/list-reports-page/list-reports-page.component'

const routes: Routes = [
    {
        path: '',
        // component: HomePage,
        component: HomePageComponent,
    },
    {
        path: RoutesName.REPORTS,
        component: ListReportsPageComponent,
    },
    {
        // path: 'profile',
        path: RoutesName.PROFILE,
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
