import { Component, OnInit } from '@angular/core'
import { ValidatorsService } from 'src/app/shared/services/validators.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'app-login-page',
    standalone: false,
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
    public title: string = 'iniciar sesión'
    private _fb: FormBuilder = new FormBuilder()

    constructor(private _validator: ValidatorsService) {}

    public loginForm: FormGroup = this._fb.group({
        email: [
            '',
            [
                Validators.required,
                Validators.pattern(this._validator.emailPattern),
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
    })

    ngOnInit() {}

    isInvalidField(field: string): boolean | null {
        return this._validator.isInvalidField(this.loginForm, field)
    }

    onSubmit(): void {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched()
            return
        }
        // redirigir

        // console.log(this.getCurrentCustomer())
    }
}
