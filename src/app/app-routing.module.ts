import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { authGuard } from './auth/guard/auth.guard'
import { publicActivateGuard } from './auth/guard/public-activate.guard'
import { RoutesName } from './shared/routes/routes'

const routes: Routes = [
    {
        // path: 'auth',
        path: RoutesName.AUTH.route,
        loadChildren: () =>
            import('./auth/auth.module').then((m) => m.AuthModule),
        canActivate: [publicActivateGuard],
    },
    {
        path: RoutesName.INDEX.route,
        // path: 'index',
        loadChildren: () =>
            import('./boton/boton.module').then((m) => m.BotonModule),
        canActivate: [authGuard],
    },
    {
        path: '**',
        redirectTo: RoutesName.AUTH.route,
        pathMatch: 'full',
    },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
