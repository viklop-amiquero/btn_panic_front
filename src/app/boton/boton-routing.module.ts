import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomePageComponent } from './pages/home-page/home-page.component'
import { ProfilePageComponent } from './pages/profile-page/profile-page.component'
import { RoutesName } from '../shared/routes/routes'
import { ListReportsPageComponent } from './pages/list-reports-page/list-reports-page.component'
import { MainLayoutComponent } from './layout/main-layout/main-layout.component'

const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', component: HomePageComponent },
            {
                path: RoutesName.REPORTS.route,
                component: ListReportsPageComponent,
            },
            { path: RoutesName.PROFILE.route, component: ProfilePageComponent },
            {
                path: '**',
                redirectTo: RoutesName.INDEX.route,
                // redirectTo: 'login',
            },
        ],
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BotonRoutingModule {}
