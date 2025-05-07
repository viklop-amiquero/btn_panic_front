import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { ValidatorsService } from 'src/app/shared/services/validators.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { RoutesName } from 'src/app/shared/routes/routes'
import { ModalController } from '@ionic/angular'
import { InfoDvComponent } from '../../components/info-dv/info-dv.component'
import { RecoverPasswordRequest } from '../../models/requests/recover-password.request'
import { PasswordVisibilityHandler } from 'src/app/shared/helpers/password-visibility.helper'

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
    public showPassword = new PasswordVisibilityHandler()

    constructor(
        private _validator: ValidatorsService,
        private _toast: ToastService,
        private _authService: AuthService,
        private _router: Router,
        private _modalCtrl: ModalController
    ) {}
    ngOnInit() {}

    public recoverPasswordForm: FormGroup = this._fb.group(
        {
            username: [
                '',
                [
                    Validators.required,
                    Validators.pattern(this._validator.emailPattern),
                ],
            ],
            dni: [
                '',
                [
                    Validators.required,
                    Validators.pattern(this._validator.dniPattern),
                ],
            ],
            digito_verificador: [
                '',
                [
                    Validators.required,
                    Validators.pattern(this._validator.digitoPattern),
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

    getCurrentDataForm(): RecoverPasswordRequest {
        const data = this.recoverPasswordForm.value
        return data
    }

    onSubmit(): void {
        if (this.recoverPasswordForm.invalid) {
            this.recoverPasswordForm.markAllAsTouched()
            return
        }

        this._authService.passwordRecover(this.getCurrentDataForm()).subscribe({
            next: (resp) => {
                // console.log(resp.message)
                this._toast.showToast(
                    `Se actualizó la contraseña exitosamente`,
                    'success'
                )

                // resetear formulario
                this.recoverPasswordForm.reset()
                //redirigir
                this._router.navigate([RoutesName.LOGIN.route])
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

    isInvalidField(field: string): boolean | null {
        return this._validator.isInvalidField(this.recoverPasswordForm, field)
    }

    getErrorMessage(field: string): string | null {
        return this._validator.getErrorMessage(field, this.recoverPasswordForm)
    }

    async openInfoModal() {
        const modal = await this._modalCtrl.create({
            component: InfoDvComponent,
        })
        await modal.present()
    }
}
