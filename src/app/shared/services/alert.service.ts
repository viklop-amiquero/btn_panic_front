import { Injectable } from '@angular/core'
import { AlertController } from '@ionic/angular'

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    constructor(private _alertController: AlertController) {}

    async showDeleteConfirmation(
        itemName: string = 'el registro'
    ): Promise<boolean> {
        const alert = await this._alertController.create({
            header: 'Confirmar',
            message: `¿Estás seguro de eliminar ${itemName}?`,
            cssClass: 'danger-alert',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'alert-cancel-button',
                },
                {
                    text: 'Eliminar',
                    role: 'confirm',
                    cssClass: 'alert-delete-button',
                    // handler: () => true,
                },
            ],
            // backdropDismiss: false,
        })

        await alert.present()
        const { role } = await alert.onDidDismiss()
        // return role !== 'cancel'
        return role === 'confirm'
    }
}
