import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { ValidatorsService } from 'src/app/shared/services/validators.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { RoutesName } from 'src/app/shared/routes/routes'

@Component({
    selector: 'app-password-recover-page',
    templateUrl: './password-recover-page.component.html',
    styleUrls: ['./password-recover-page.component.scss'],
    standalone: false,
})
export class PasswordRecoverPageComponent implements OnInit {
    public title: string = 'recuperar contraseña'

    private _fb: FormBuilder = new FormBuilder()
    public routesName = RoutesName

    constructor(
        private _validator: ValidatorsService,
        private _toast: ToastService,
        private _authService: AuthService,
        private _router: Router
    ) {}
    ngOnInit() {}

    public registerForm: FormGroup = this._fb.group(
        {
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
    onSubmit() {}

    isInvalidField(field: string): boolean | null {
        return this._validator.isInvalidField(this.registerForm, field)
    }

    getErrorMessage(field: string): string | null {
        return this._validator.getErrorMessage(field, this.registerForm)
    }
}
