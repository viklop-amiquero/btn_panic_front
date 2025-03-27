import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import { authGuard } from './auth/guard/auth.guard'
import { publicActivateGuard } from './auth/guard/public-activate.guard'

const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () =>
            import('./auth/auth.module').then((m) => m.AuthModule),
        canActivate: [publicActivateGuard],
    },
    {
        path: 'home',
        loadChildren: () =>
            import('./boton/boton.module').then((m) => m.BotonModule),
        canActivate: [authGuard],
    },
    {
        path: '**',
        redirectTo: 'auth',
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
