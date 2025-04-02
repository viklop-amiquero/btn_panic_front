import { Component, OnInit } from '@angular/core'
import { RoutesName } from '../../routes/routes'
import { AuthService } from 'src/app/auth/services/auth.service'
import { Router } from '@angular/router'
import { ToastService } from '../../services/toast.service'

@Component({
    selector: 'shared-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss'],
    standalone: false,
})
export class SideMenuComponent implements OnInit {
    // public menuRoutes = Object.values(RoutesName)
    public routesName = RoutesName
    constructor(
        private _authService: AuthService,
        private _router: Router,
        private _toast: ToastService
    ) {}

    ngOnInit() {}

    logout() {
        this._authService.logout().subscribe({
            next: (value) => {
                if (!value) {
                    return
                }
                this._router.navigate([this.routesName.AUTH.route])
            },
            error: (err) => {
                if (!err.error || !err.error.errors) {
                    this._toast.showToast(
                        'Ocurrió un error inesperado, por favor intentelo más tarde.',
                        'warning'
                    )
                    return
                }
                this._toast.showToast('Error al cerrar sesión', 'danger')
            },
        })
        // alert('cerrando sesión')
    }
}
