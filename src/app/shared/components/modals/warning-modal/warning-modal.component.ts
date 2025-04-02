import { Component, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'

@Component({
    selector: 'app-warning-modal',
    templateUrl: './warning-modal.component.html',
    styleUrls: ['./warning-modal.component.scss'],
    standalone: false,
})
export class WarningModalComponent implements OnInit {
    constructor(private _modalController: ModalController) {}

    ngOnInit() {}

    closeModal() {
        this._modalController.dismiss()
    }
}
