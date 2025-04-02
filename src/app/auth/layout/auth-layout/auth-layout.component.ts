import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
    selector: 'app-auth-layout',
    templateUrl: './auth-layout.component.html',
    styleUrls: ['./auth-layout.component.scss'],
    standalone: false,
})
export class AuthLayoutComponent implements OnInit {
    title: string = 'Bienvenido'

    constructor(private _router: Router) {
        this.updateTitle()
    }

    private updateTitle() {
        const path = this._router.url
        if (path.includes('/login')) {
            this.title = 'Iniciar Sesión'
        } else if (path.includes('/register')) {
            this.title = 'Registrarse'
        }
    }

    ngOnInit() {}
}
