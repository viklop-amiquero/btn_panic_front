import { Component, OnInit } from '@angular/core'
import { ValidatorsService } from 'src/app/shared/services/validators.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import {
    LoginCredentials,
    LoginSuccess,
} from '../../interfaces/login.interface'
import { ToastService } from 'src/app/shared/services/toast.service'

@Component({
    selector: 'app-login-page',
    standalone: false,
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
    public title: string = 'iniciar sesión'
    private _fb: FormBuilder = new FormBuilder()

    constructor(
        private _validator: ValidatorsService,
        private _toast: ToastService,
        private _authService: AuthService
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

    getCurrentCredentials(): LoginCredentials {
        const data = this.loginForm.value
        return data
    }

    isInvalidField(field: string): boolean | null {
        return this._validator.isInvalidField(this.loginForm, field)
    }

    onSubmit(): void {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched()
            return
        }

        this._authService.login(this.getCurrentCredentials()).subscribe({
            next: (resp: LoginSuccess) => {
                if (!resp.token) {
                    this._toast.showToast(
                        'Respuesta inesperada del servidor.',
                        'danger'
                    )
                    return
                }

                console.log(resp.token)
                this._toast.showToast('Inicio de sesión exitoso', 'success')

                // Redirigir a la página principal o dashboard
                // this._router.navigate(['/dashboard'])
            },
            error: (err) => {
                // console.error('Error en inicio de sesión:', err)

                if (!err.error) {
                    this._toast.showToast(
                        'Ocurrió un error inesperado.',
                        'danger'
                    )
                    return
                }

                if (!err.error.errors) {
                    this._toast.showToast(
                        err.error.message ??
                            'Error desconocido al iniciar sesión.',
                        'danger'
                    )
                }
                const errorMessages = Object.values(err.error.errors).flat()
                errorMessages.forEach((message, index) => {
                    setTimeout(() => {
                        this._toast.showToast(`${message}`, 'danger')
                    }, index * 1500)
                })
            },
        })
        // this._authService.login(this.getCurrentCredentials()).subscribe({
        //     next: (resp) => {
        //         const successResp = resp as LoginSuccess
        //         // console.log(Object.keys(resp))
        //         console.log(successResp.token)
        //         // const token = resp.token
        //         this._toast.showToast('Inicio de sesión exitoso', 'success')
        //     },
        //     error: (err) => {
        //         console.log(err)
        //         // console.log(err.message)
        //         if (!err.error && !err.error.errors) {
        //             this._toast.showToast(
        //                 'Ocurrió un error inesperado.',
        //                 'danger'
        //             )
        //         }

        //         const errorMessages = Object.values(err.error.errors).flat()
        //         errorMessages.forEach((message, index) => {
        //             setTimeout(() => {
        //                 this._toast.showToast(`${message}`, 'danger')
        //             }, index * 1500)
        //         })
        //     },
        // })
        // redirigir

        // console.log(this.getCurrentCustomer())
    }
}
