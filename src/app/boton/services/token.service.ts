import { Injectable } from '@angular/core'
import { Preferences } from '@capacitor/preferences'

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    // private _token: string = ''
    constructor() {}

    async loadToken(): Promise<string> {
        const { value } = await Preferences.get({ key: 'authToken' })
        // const token = value || ''
        // this._token = value || ''
        return value || ''
    }

    async removeToken(): Promise<void> {
        await Preferences.remove({ key: 'authToken' })
    }
}
