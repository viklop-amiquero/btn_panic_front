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
        private _toast: ToastService
    ) {}

    public registerForm: FormGroup = this._fb.group(
        {
            name: [
                '',
                [
                    Validators.required,
                    Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúÑñ\\s]+$'),
                ],
            ],
            apellido: [
                '',
                [
                    Validators.required,
                    Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúÑñ\\s]+$'),
                ],
            ],
            direccion_domicilio: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            telefono: [
                '',
                [Validators.required, Validators.pattern('^[0-9]+$')],
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
            validators: this.isFieldOneEqualFieldTwo(
                'password',
                'password_confirmation'
            ),
        }
    )

    ngOnInit() {}

    public isFieldOneEqualFieldTwo(field1: string, field2: string) {
        return (formGroup: AbstractControl): ValidationErrors | null => {
            const fieldValue1 = formGroup.get(field1)?.value
            const fieldValue2 = formGroup.get(field2)?.value

            if (fieldValue1 !== fieldValue2) {
                // console.log({
                //     condicional: true,
                //     field1: fieldValue1,
                //     field2: fieldValue2,
                // })

                formGroup.get(field2)?.setErrors({ notEqual: true })

                return { notEqual: true }
            }

            formGroup.get(field2)?.setErrors(null)

            return null
        }
    }

    isInvalidField(field: string): boolean | null {
        return (
            this.registerForm.controls[field].errors &&
            this.registerForm.controls[field].touched
        )
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
                console.log(err.message)
                if (err.error && err.error.errors) {
                    const errorMessages = Object.values(err.error.errors)
                        .flat()
                        .join('\n')

                    this._toast.showToast(errorMessages, 'danger')
                } else {
                    this._toast.showToast(
                        'Ocurrió un error inesperado.',
                        'danger'
                    )
                }
            },
        })

        // redirigir

        // console.log(this.getCurrentCustomer())
    }
}
