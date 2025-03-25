import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
    selector: 'boton-btn-panic',
    templateUrl: './btn-panic.component.html',
    styleUrls: ['./btn-panic.component.scss'],
    standalone: false,
})
export class BtnPanicComponent implements OnInit {
    public txtBoton = 'presionar'

    constructor() {}

    ngOnInit() {}

    @Output()
    public onSubmit = new EventEmitter<boolean>()
    public rol: string[] = []

    isActivated = false
    private pressTimer: any

    startPress() {
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
}
