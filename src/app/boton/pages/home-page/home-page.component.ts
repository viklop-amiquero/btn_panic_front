import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Preferences } from '@capacitor/preferences'
import { BotonService } from '../../services/boton.service'
import { ToastService } from 'src/app/shared/services/toast.service'
import { Router } from '@angular/router'

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    standalone: false,
})
export class HomePageComponent implements OnInit {
    private _fb: FormBuilder = new FormBuilder()
    private _token!: string

    constructor(
        private _botonService: BotonService,
        private _toastService: ToastService,
        private _router: Router
    ) {}

    async ngOnInit() {
        await this.loadToken()
        this.categorias
    }

    public homeForm: FormGroup = this._fb.group({
        categoria_id: ['', Validators.required],
        descripcion: ['', Validators.required],
    })

    async loadToken() {
        const { value } = await Preferences.get({ key: 'authToken' })
        this._token = value || ''
    }

    async removeToken() {
        await Preferences.remove({ key: 'authToken' })
        console.log('Token eliminado')
    }

    get categorias() {
        if (!this._token) {
            this._toastService.showToast(
                'Sesión expirada. Inicie sesión nuevamente.',
                'warning'
            )
            this._router.navigate(['/auth'])
            return
        }
        return this._botonService.getCategories(this._token).subscribe({
            next: ({ data }) => {
                console.log('Categorías:', data)
                // this._toastService.showToast()
            },
            error: (err) => {
                this._toastService.showToast(
                    'App en mantenimiento, regrese más tarde.',
                    'danger'
                )
                setTimeout(async () => {
                    await this.removeToken()
                    this._router.navigate(['/auth'])
                }, 1000)
                // console.error('Error al obtener categorías:', err)
            },
        })
    }

    onSubmit() {}
}
