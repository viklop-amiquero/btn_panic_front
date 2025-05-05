import { Component, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'

@Component({
    selector: 'app-info-dv',
    templateUrl: './info-dv.component.html',
    styleUrls: ['./info-dv.component.scss'],
    standalone: false,
})
export class InfoDvComponent implements OnInit {
    constructor(private _modalCtrol: ModalController) {}

    ngOnInit() {}

    dismissModal() {
        this._modalCtrol.dismiss()
    }
}
