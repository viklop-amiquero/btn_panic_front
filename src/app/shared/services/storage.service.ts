import { Injectable } from '@angular/core'
import { Preferences } from '@capacitor/preferences'

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    constructor() {}

    async setStorageItem<T>(key: string, value: T): Promise<void> {
        await Preferences.set({ key, value: JSON.stringify(value) })
    }

    async getStorageItem<T>(key: string): Promise<T | null> {
        const { value } = await Preferences.get({ key })
        return value ? JSON.parse(value) : null
    }

    async removeStorageItem(key: string): Promise<void> {
        await Preferences.remove({ key })
        // await Preferences.clear()
    }

    async clearStorage(): Promise<void> {
        await Preferences.clear()
    }
}
