import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'

import { ToastService } from 'src/app/shared/services/toast.service'
import { ValidatorsService } from 'src/app/shared/services/validators.service'

import { RoutesName } from 'src/app/shared/routes/routes'
import { CustomerCreateRequest } from '../../models/requests/customer-create.request'

@Component({
    selector: 'app-register-page',
    standalone: false,
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
    public title: string = 'registrarse'
    private _fb: FormBuilder = new FormBuilder()
    public routesName = RoutesName
    constructor(
        private _authService: AuthService,
        private _toast: ToastService,
        private _validator: ValidatorsService,
        private _router: Router
    ) {}

    public registerForm: FormGroup = this._fb.group(
        {
            name: [
                '',
                [
                    Validators.required,
                    Validators.pattern(this._validator.namePattern),
                ],
            ],
            apellido: [
                '',
                [
                    Validators.required,
                    Validators.pattern(this._validator.namePattern),
                ],
            ],
            direccion_domicilio: ['', [Validators.required]],
            dni: [
                '',
                [
                    Validators.required,
                    Validators.pattern(this._validator.dniPattern),
                ],
            ],
            email: [
                '',
                [
                    Validators.required,
                    Validators.pattern(this._validator.emailPattern),
                ],
            ],
            telefono: [
                '',
                [
                    Validators.required,
                    Validators.pattern(this._validator.celularPattern),
                ],
            ],
            password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d).+$'),
                ],
            ],
            password_confirmation: ['', [Validators.required]],
        },
        {
            validators: this._validator.isFieldOneEqualFieldTwo(
                'password',
                'password_confirmation'
            ),
        }
    )

    ngOnInit() {}

    isInvalidField(field: string): boolean | null {
        return this._validator.isInvalidField(this.registerForm, field)
    }

    getCurrentCustomer(): CustomerCreateRequest {
        const customer = this.registerForm.value
        return customer
    }

    onSubmit(event: Event): void {
        if (this.registerForm.invalid) {
            this.registerForm.markAllAsTouched()
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

        this._authService.createCustomer(this.getCurrentCustomer()).subscribe({
            next: (resp) => {
                // console.log(resp.message)
                this._toast.showToast(`${resp.message}`, 'success')

                // resetear formulario
                this.registerForm.reset()
                //redirigir
                this._router.navigate([RoutesName.AUTH.route])
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
