import { Component, OnInit } from '@angular/core'
import { RoutesName } from '../../routes/routes'
import { AuthService } from 'src/app/auth/services/auth.service'
import { Router } from '@angular/router'

@Component({
    selector: 'shared-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss'],
    standalone: false,
})
export class SideMenuComponent implements OnInit {
    // public menuRoutes = Object.values(RoutesName)
    public routesName = RoutesName

    constructor(private _authService: AuthService, private _router: Router) {}

    ngOnInit() {}

    logout() {
        this._authService.logout().subscribe({
            next: (value) => {
                if (!value) {
                    return
                }

                this._router.navigate([this.routesName.AUTH.route])
            },
        })
        // alert('cerrando sesión')
    }
}
