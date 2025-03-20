import { Injectable } from '@angular/core'
import { Preferences } from '@capacitor/preferences'

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    private _token: string = ''
    constructor() {}

    async loadToken(): Promise<string> {
        const { value } = await Preferences.get({ key: 'authToken' })
        this._token = value || ''
        return this._token
    }

    async removeToken(): Promise<void> {
        await Preferences.remove({ key: 'authToken' })
        // console.log('Token eliminado')
    }
}
