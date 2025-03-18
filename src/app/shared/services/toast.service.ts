import { Injectable } from '@angular/core'
import { ToastController } from '@ionic/angular'

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    constructor(private _toastController: ToastController) {}

    async showToast(message: string, color: 'success' | 'danger' | 'warning') {
        const toast = await this._toastController.create({
            message,
            duration: 3000,
            position: 'top',
            color,
        })
        toast.present()
    }
}
