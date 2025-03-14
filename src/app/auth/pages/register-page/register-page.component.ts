import { Component, OnInit } from '@angular/core'
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    Validators,
} from '@angular/forms'

@Component({
    selector: 'app-register-page',
    standalone: false,
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
    private _fb: FormBuilder = new FormBuilder()

    constructor() {}

    public registerForm: FormGroup = this._fb.group(
        {
            nombre: [
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
                console.log({
                    condicional: true,
                    field1: fieldValue1,
                    field2: fieldValue2,
                })

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

    submitForm() {}
}
