import { Component, OnInit } from '@angular/core'
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    Validators,
} from '@angular/forms'
import { CustomerRegister } from '../../interfaces/customer.interface'
import { AuthService } from '../../services/auth.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { ValidatorsService } from 'src/app/shared/services/validators.service'

@Component({
    selector: 'app-register-page',
    standalone: false,
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
    private _fb: FormBuilder = new FormBuilder()

    constructor(
        private _authService: AuthService,
        private _toast: ToastService,
        private _validator: ValidatorsService
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

    getCurrentCustomer(): CustomerRegister {
        const customer = this.registerForm.value
        return customer
    }

    onSubmit(): void {
        if (this.registerForm.invalid) {
            this.registerForm.markAllAsTouched()
            return
        }
        this._authService.addCustomer(this.getCurrentCustomer()).subscribe({
            next: (resp) => {
                console.log(resp)
                this._toast.showToast(`${resp.message}`, 'success')
            },
            error: (err) => {
                // console.log(err.message)
                if (!err.error && !err.error.errors) {
                    this._toast.showToast(
                        'Ocurrió un error inesperado.',
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

        // redirigir

        // console.log(this.getCurrentCustomer())
    }
}
