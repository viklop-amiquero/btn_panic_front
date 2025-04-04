import { Component, OnInit } from '@angular/core'
import { ValidatorsService } from 'src/app/shared/services/validators.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { Preferences } from '@capacitor/preferences'
import { AuthService } from '../../services/auth.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { Router } from '@angular/router'

import { RoutesName } from 'src/app/shared/routes/routes'

import { AuthRequest } from '../../models/requests/auth.request'
import { AuthResponse } from '../../models/responses/auth.response'

@Component({
    selector: 'app-login-page',
    standalone: false,
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
    public title: string = 'iniciar sesión'
    private _fb: FormBuilder = new FormBuilder()
    public routesName = RoutesName
    public loading = true
    constructor(
        private _validator: ValidatorsService,
        private _toast: ToastService,
        private _authService: AuthService,
        private _router: Router
    ) {}

    public loginForm: FormGroup = this._fb.group({
        username: [
            '',
            [
                Validators.required,
                Validators.pattern(this._validator.emailPattern),
            ],
        ],
        password: ['', [Validators.required]],
    })

    ngOnInit() {}

    getCurrentCredentials(): AuthRequest {
        const data = this.loginForm.value
        return data
    }

    isInvalidField(field: string): boolean | null {
        return this._validator.isInvalidField(this.loginForm, field)
    }

    async onSubmit(event: Event): Promise<void> {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched()
            return
        }

        // Quitar el foco del botón
        if (event.target instanceof HTMLElement) {
            const submitButton = event.target.querySelector(
                'ion-button[type="submit"]'
            )
            if (submitButton instanceof HTMLElement) {
                submitButton.blur()
            }
        }

        this._authService.login(this.getCurrentCredentials()).subscribe({
            next: async (resp: AuthResponse) => {
                // ⬅️ Añadir async aquí
                if (!resp.token) {
                    this._toast.showToast(
                        'Respuesta inesperada del servidor.',
                        'danger'
                    )
                    return
                }

                // Almacenar el token de manera correcta
                await Preferences.set({ key: 'authToken', value: resp.token })

                // Resetear formulario
                this.loginForm.reset()

                // Redirigir a home
                this._router.navigate([RoutesName.INDEX.route])
            },
            error: (err) => {
                if (!err.error || !err.error.errors) {
                    this._toast.showToast(
                        'Ocurrió un error inesperado, por favor intentelo más tarde.',
                        'warning'
                    )
                    return
                }

                const errorMessages = Object.values(err.error.errors).flat()
                errorMessages.forEach((message, index) => {
                    setTimeout(() => {
                        this._toast.showToast(`${message}`, 'danger')
                    }, index * 1500)
                })
            },
        })
    }
}
