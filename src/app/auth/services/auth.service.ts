import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
} from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { environment } from 'src/environments/environment'
import {
    catchError,
    Observable,
    throwError,
    of,
    from,
    map,
    tap,
    switchMap,
} from 'rxjs'

import { Preferences } from '@capacitor/preferences'

import { TokenService } from 'src/app/boton/services/token.service'

import { CustomerCreateRequest } from '../models/requests/customer-create.request'
import { CustomerCreateResponse } from '../models/responses/customer-create.response'
import { AuthResponse } from '../models/responses/auth.response'
import { AuthRequest } from '../models/requests/auth.request'
import { Persona } from '../../models/domain/persona.interface'
import { Customer } from '../../models/domain/customer.interface'
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly http = inject(HttpClient)
    private readonly tokenService = inject(TokenService)
    private readonly apiUrl: string = environment.baseUrl

    public _persona: Persona | null = null
    public _account: Customer | null = null

    private get defaultHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'application/json',
        })
    }

    private get authHeaders(): Observable<HttpHeaders> {
        return from(this.tokenService.loadToken()).pipe(
            map((token) => {
                if (!token) throw new Error('No token available')
                return this.defaultHeaders.set(
                    'Authorization',
                    `Bearer ${token}`
                )
            })
        )
    }

    get isAuthenticated(): boolean {
        return !!this._account?.id && !!this._persona?.id
    }

    // get persona(): Persona | null {
    //     return this._persona
    // }

    // get account(): Customer | null {
    //     return this._account
    // }

    // ==================== Storage Operations ====================
    private async setStorageItem<T>(key: string, value: T): Promise<void> {
        await Preferences.set({ key, value: JSON.stringify(value) })
    }

    private async getStorageItem<T>(key: string): Promise<T | null> {
        const { value } = await Preferences.get({ key })
        return value ? JSON.parse(value) : null
    }

    private async removeStorageItem(key: string): Promise<void> {
        await Preferences.remove({ key })
    }

    // ==================== API Operations ====================
    createCustomer(
        customer: CustomerCreateRequest
    ): Observable<CustomerCreateResponse> {
        return this.http
            .post<CustomerCreateResponse>(
                `${this.apiUrl}/api/register`,
                customer,
                { headers: this.defaultHeaders }
            )
            .pipe(catchError((error) => throwError(() => error)))
    }

    login(credentials: AuthRequest): Observable<AuthResponse> {
        return this.http
            .post<AuthResponse>(`${this.apiUrl}/api/login`, credentials, {
                headers: this.defaultHeaders,
            })
            .pipe(
                catchError((error) => {
                    // Convertimos el error en una respuesta controlada
                    return of({
                        error: true,
                        message:
                            error.error?.message || 'Error de autenticación',
                    } as unknown as AuthResponse)
                })
            )
    }
    // login(credentials: AuthRequest): Observable<AuthResponse> {
    //     return this.http
    //         .post<AuthResponse>(`${this.apiUrl}/api/login`, credentials, {
    //             headers: this.defaultHeaders,
    //         })
    //         .pipe(
    //             tap(async (response) => {
    //                 this._account = response.user
    //                 await this.setStorageItem('user', response.user)
    //             }),
    //             catchError((error) =>
    //                 throwError(() => {
    //                     status: error.status
    //                     error: error.error
    //                 })
    //             )
    //         )
    // }

    logout(): Observable<boolean> {
        return this.authHeaders.pipe(
            switchMap((headers) =>
                this.http
                    .post(`${this.apiUrl}/api/logout`, {}, { headers })
                    .pipe(
                        tap(async () => await this.clearAuthData()),
                        map(() => true),
                        catchError(() => of(false))
                    )
            ),
            catchError(() => {
                this.clearAuthData()
                return of(true)
            })
        )
    }

    checkAuthentication(): Observable<boolean> {
        return this.authHeaders.pipe(
            switchMap((headers) =>
                this.http
                    .get<Persona>(`${this.apiUrl}/api/cliente`, { headers })
                    .pipe(
                        tap(async (persona) => {
                            this._persona = persona
                            await this.setStorageItem('persona', persona)
                        }),
                        map(() => true),
                        catchError(() => of(false))
                    )
            ),
            catchError(() => of(false))
        )
    }

    async loadStoredData(): Promise<void> {
        this._persona = await this.getStorageItem<Persona>('persona')
        this._account = await this.getStorageItem<Customer>('user')
    }

    private async clearAuthData(): Promise<void> {
        await Promise.all([
            this.tokenService.removeToken(),
            this.removeStorageItem('user'),
            this.removeStorageItem('persona'),
        ])
        this._persona = null
        this._account = null
    }
}

// import { HttpClient, HttpHeaders } from '@angular/common/http'
// import { Injectable } from '@angular/core'
// import { environment } from 'src/environments/environment'
// import {
//     catchError,
//     Observable,
//     throwError,
//     of,
//     from,
//     map,
//     tap,
//     switchMap,
// } from 'rxjs'

// import { Preferences } from '@capacitor/preferences'

// import { TokenService } from 'src/app/boton/services/token.service'

// import { CustomerCreateRequest } from '../models/requests/customer-create.request'
// import { CustomerCreateResponse } from '../models/responses/customer-create.response'
// import { AuthResponse } from '../models/responses/auth.response'
// import { AuthRequest } from '../models/requests/auth.request'
// import { Persona } from '../models/domain/persona'
// import { Customer } from '../models/domain/customer'

// @Injectable({
//     providedIn: 'root',
// })
// export class AuthService {
//     private _apiUrl: string = environment.baseUrl
//     public _persona: Persona = {} as Persona
//     public _account: Customer = {} as Customer

//     constructor(
//         private _http: HttpClient,
//         private _tokenService: TokenService
//     ) {}

//     get isAuthenticated(): boolean {
//         return !!this._account?.id && !!this._persona?.id
//     }

//     async saveToStorage(key: string, value: any) {
//         await Preferences.set({ key, value: JSON.stringify(value) })
//     }

//     async getFromStorage<T>(key: string): Promise<T | null> {
//         const { value } = await Preferences.get({ key })

//         return value ? JSON.parse(value) : null
//     }

//     async removeFromStorage(key: string) {
//         await Preferences.remove({ key })
//     }

//     addCustomer(
//         customer: CustomerCreateRequest
//     ): Observable<CustomerCreateResponse> {
//         const headers = new HttpHeaders({
//             'Content-Type': 'application/json',
//             Accept: 'application/json',
//         })

//         return this._http
//             .post<CustomerCreateResponse>(
//                 `${this._apiUrl}/api/register`,
//                 customer,
//                 {
//                     headers,
//                 }
//             )
//             .pipe(
//                 catchError((error) => {
//                     return throwError(() => error)
//                 })
//             )
//     }

//     login(data: AuthRequest): Observable<AuthResponse> {
//         const headers = new HttpHeaders({
//             'Content-Type': 'application/json',
//             Accept: 'application/json',
//         })

//         return this._http
//             .post<AuthResponse>(`${this._apiUrl}/api/login`, data, { headers })
//             .pipe(
//                 tap(async (response) => {
//                     this._account = response.user
//                     await this.saveToStorage('user', response.user)
//                 }),
//                 catchError((error) => {
//                     return throwError(() => error)
//                 })
//             )
//     }

//     logout(): Observable<boolean> {
//         return from(this._tokenService.loadToken()).pipe(
//             switchMap((token) => {
//                 if (!token) return of(false)

//                 const headers = new HttpHeaders({
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                     Accept: 'application/json',
//                 })

//                 return this._http
//                     .post(`${this._apiUrl}/api/logout`, {}, { headers })
//                     .pipe(
//                         tap(async () => {
//                             await this._tokenService.removeToken()
//                             await this.removeFromStorage('user')
//                             await this.removeFromStorage('persona')
//                             this._persona = {} as Persona
//                             this._account = {} as Customer
//                         }),
//                         map(() => true),
//                         catchError(() => of(false))
//                     )
//             })
//         )
//     }

//     checkAuthentication(): Observable<boolean> {
//         return from(this._tokenService.loadToken()).pipe(
//             switchMap((token) => {
//                 if (!token) return of(false)

//                 const headers = new HttpHeaders({
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                     Accept: 'application/json',
//                 })

//                 return this._http
//                     .get<Persona>(`${this._apiUrl}/api/cliente`, { headers })
//                     .pipe(
//                         tap(async (persona) => {
//                             this._persona = persona
//                             await this.saveToStorage('persona', persona)
//                         }),
//                         map((persona) => !!persona),
//                         catchError(() => of(false))
//                     )
//             })
//         )
//     }

//     async loadStoredData() {
//         this._persona =
//             (await this.getFromStorage<Persona>('persona')) || ({} as Persona)
//         this._account =
//             (await this.getFromStorage<Customer>('user')) || ({} as Customer)
//     }
// }
