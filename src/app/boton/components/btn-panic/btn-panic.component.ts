import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core'
import { ToastService } from 'src/app/shared/services/toast.service'

@Component({
    selector: 'boton-btn-panic',
    templateUrl: './btn-panic.component.html',
    styleUrls: ['./btn-panic.component.scss'],
    standalone: false,
})
export class BtnPanicComponent implements OnInit {
    public txtBoton = 'presionar'

    constructor(private _toastService: ToastService) {}

    ngOnInit() {}

    @Output()
    public onSubmit = new EventEmitter<boolean>()

    @Input()
    isFormValid: boolean = false

    isActivated = false
    private pressTimer: any

    startPress() {
        if (!this.isFormValid) {
            this._toastService.showToast('Debe completar los campos.', 'danger')
            // console.log('Formulario inválido, no se puede activar el botón.')
            return
        }
        this.pressTimer = setTimeout(() => {
            this.isActivated = true // Cambia el estado después de 2 segundos
            this.txtBoton = 'activado'
            this.emitEvent()
        }, 2000)
    }

    endPress() {
        clearTimeout(this.pressTimer) // Cancela el temporizador si suelta antes
    }

    emitEvent() {
        if (this.isActivated) {
            this.onSubmit.emit(true)
        }
    }

    resetButton() {
        this.isActivated = false
        this.txtBoton = 'presionar'
    }
}
