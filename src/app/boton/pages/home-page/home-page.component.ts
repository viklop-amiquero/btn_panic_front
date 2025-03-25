import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { BotonService } from '../../services/boton.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { Router } from '@angular/router'
import { TokenService } from '../../services/token.service'
import { Categoria } from '../../interfaces/categoria.interface'
import { ValidatorsService } from 'src/app/shared/services/validators.service'
import { Reporte } from '../../interfaces/reporte.interface'

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    standalone: false,
})
export class HomePageComponent implements OnInit {
    private _fb: FormBuilder = new FormBuilder()
    private _token!: string
    public categorias: Categoria[] = []

    constructor(
        private _botonService: BotonService,
        private _toastService: ToastService,
        private _router: Router,
        private _tokenService: TokenService,
        private _validatorService: ValidatorsService
    ) {}

    async ngOnInit() {
        this._token = await this._tokenService.loadToken()
        this.getCategorias()

        // solucion are-hidden
        const observer = new MutationObserver((mutations) => {
            const outlet = document.querySelector('ion-router-outlet')
            if (outlet?.getAttribute('aria-hidden') === 'true') {
                outlet.removeAttribute('aria-hidden')
            }
            mutations.forEach((mutation) => {
                const target = mutation.target as HTMLElement

                // Si el elemento afectado es un ion-alert (el modal del select)
                if (
                    target.tagName.toLowerCase() === 'ion-alert' &&
                    target.getAttribute('aria-hidden') === 'true'
                ) {
                    target.removeAttribute('aria-hidden') // Habilitamos la visibilidad
                    target.removeAttribute('inert') // Permitimos interacción
                }
            })
        })

        // Observamos cambios en el modal del select
        observer.observe(document.body, {
            attributes: true,
            subtree: true,
            attributeFilter: ['aria-hidden'],
        })
    }

    public homeForm: FormGroup = this._fb.group({
        categoria_id: ['', Validators.required],
        imagen: [''],
        descripcion: ['', Validators.required],
        direccion: ['', Validators.required],
    })

    getCategorias() {
        if (!this._token) {
            this._toastService.showToast(
                'Sesión expirada. Inicie sesión nuevamente.',
                'warning'
            )
            this._router.navigate(['/auth'])
            return
        }
        this._botonService.getCategories(this._token).subscribe({
            next: ({ data }) => {
                this.categorias = data
                // console.log('Categorías:', data)
                // return data
                // this._toastService.showToast()
            },
            error: (err) => {
                this._toastService.showToast(
                    'App en mantenimiento, regrese más tarde.',
                    'warning'
                )
                setTimeout(async () => {
                    await this._tokenService.removeToken()
                    this._router.navigate(['/auth'])
                }, 1000)
                // console.error('Error al obtener categorías:', err)
            },
        })
    }

    isInvalidField(field: string): boolean | null {
        // return this._validator.isInvalidField(this.loginForm, field)
        return this._validatorService.isInvalidField(this.homeForm, field)
    }

    getCurrentReport(): Reporte {
        const reporte = this.homeForm.value
        return reporte
    }

    onSubmit() {
        // console.log('despues de dos segundos')

        if (this.homeForm.invalid) {
            this.homeForm.markAllAsTouched()
            return
        }

        this._botonService
            .addReport(this.getCurrentReport(), this._token)
            .subscribe({
                next: (resp) => {
                    console.log(resp)
                    this._toastService.showToast(`${resp.message}`, 'success')

                    // redirigir
                    // document.activeElement?.blur()

                    // this._router.navigate(['/home'])
                },
                error: (err) => {
                    // console.log(err)

                    if (!err.error || !err.error.errors) {
                        this._toastService.showToast(
                            'Ocurrió un error inesperado, por favor intentelo más tarde.',
                            'warning'
                        )
                        return
                    }

                    const errorMessages = Object.values(err.error.errors).flat()
                    errorMessages.forEach((message, index) => {
                        setTimeout(() => {
                            this._toastService.showToast(`${message}`, 'danger')
                        }, index * 1500)
                    })
                },
            })
        // console.log('hola mundo desde el componente padre')
    }

    onBotonPanic(isValid: boolean) {
        // console.log(`${isValid}`)
        if (!isValid) {
            return
        }
        // console.log(`${isValid}`)
        // console.log('presionado por dos segundos')
        this.onSubmit()
    }
}
