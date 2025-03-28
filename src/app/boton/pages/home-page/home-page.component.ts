import { Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { BotonService } from '../../services/boton.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { Router } from '@angular/router'
import { TokenService } from '../../services/token.service'
import { Categoria } from '../../interfaces/categoria.interface'
import { ValidatorsService } from 'src/app/shared/services/validators.service'
import { ReporteRegister } from '../../interfaces/reporte.interface'
import { BtnPanicComponent } from '../../components/btn-panic/btn-panic.component'
import { RoutesName } from 'src/app/shared/routes/routes'

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    standalone: false,
})
export class HomePageComponent implements OnInit {
    @ViewChild(BtnPanicComponent)
    btnPanic!: BtnPanicComponent
    private _fb: FormBuilder = new FormBuilder()
    private _token!: string
    public categorias: Categoria[] = []
    public latitud: number | null = null
    public longitud: number | null = null

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
            // this._router.navigate(['/auth'])
            this._router.navigate([RoutesName.AUTH])
            return
        }
        this._botonService.getCategories(this._token).subscribe({
            next: ({ data }) => {
                this.categorias = data
            },
            error: (err) => {
                this._toastService.showToast(
                    'App en mantenimiento, regrese más tarde.',
                    'warning'
                )
                setTimeout(async () => {
                    await this._tokenService.removeToken()
                    // this._router.navigate(['/auth'])
                    this._router.navigate([RoutesName.AUTH])
                }, 1000)
            },
        })
    }

    isInvalidField(field: string): boolean | null {
        return this._validatorService.isInvalidField(this.homeForm, field)
    }

    getCurrentReport(): ReporteRegister {
        const reporte = this.homeForm.value
        return reporte
    }

    resetForm() {
        this.homeForm.reset()
        if (this.btnPanic) {
            this.btnPanic.resetButton()
        }
    }

    async onSubmit() {
        if (this.homeForm.invalid) {
            this.homeForm.markAllAsTouched()
            return
        }

        try {
            const ubicacion = await this._botonService.getLocation()

            const reporte: ReporteRegister = {
                ...this.getCurrentReport(),
                latitud: ubicacion.latitud,
                longitud: ubicacion.longitud,
            }

            // console.log(reporte)
            this._botonService.addReport(reporte, this._token).subscribe({
                next: (resp) => {
                    this._toastService.showToast(`${resp.message}`, 'success')

                    setTimeout(() => {
                        this.resetForm()
                    }, 1000)
                },
                error: (err) => {
                    if (!err.error || !err.error.errors) {
                        this._toastService.showToast(
                            'Ocurrió un error inesperado, por favor intentelo más tarde.',
                            'warning'
                        )
                        this.resetForm()

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
        } catch (error) {
            this._toastService.showToast(
                'No se pudo obtener la ubicación',
                'danger'
            )
            this.resetForm()
        }
    }

    onBotonPanic(isValid: boolean) {
        if (!isValid) {
            return
        }
        this.onSubmit()
    }
}
