import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Preferences } from '@capacitor/preferences'
import { BotonService } from '../../services/boton.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { Router } from '@angular/router'
import { TokenService } from '../../services/token.service'
import { Categoria } from '../../interfaces/categoria.interface'

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
        private _tokenService: TokenService
    ) {}

    async ngOnInit() {
        this._token = await this._tokenService.loadToken()
        this.getCategorias()

        // const observer = new MutationObserver(() => {
        //     const outlet = document.querySelector('ion-router-outlet')
        //     if (outlet?.getAttribute('aria-hidden') === 'true') {
        //         outlet.removeAttribute('aria-hidden')
        //     }
        // })

        // observer.observe(document.body, {
        //     attributes: true,
        //     subtree: true,
        //     attributeFilter: ['aria-hidden'],
        // })

        // solucion de los botones cancel ok
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
        descripcion: ['', Validators.required],
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
                console.log('Categorías:', data)
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

    onSubmit() {}
}
