import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { CustomerRegister } from '../interfaces/customer.interface'
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
import { RegisterSuccess } from '../interfaces/register.interface'
import { LoginCredentials, LoginSuccess } from '../interfaces/login.interface'
import { Persona } from '../interfaces/persona.interface'
import { TokenService } from 'src/app/boton/services/token.service'
import { User } from '../interfaces/user.interface'
import { Preferences } from '@capacitor/preferences'
import { LogOutResponse } from '../interfaces/logout.interface'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _apiUrl: string = environment.baseUrl
    public _persona: Persona = {} as Persona
    public _account: User = {} as User

    constructor(
        private _http: HttpClient,
        private _tokenService: TokenService
    ) {}

    get isAuthenticated(): boolean {
        return !!this._account?.id && !!this._persona?.id
    }

    async saveToStorage(key: string, value: any) {
        await Preferences.set({ key, value: JSON.stringify(value) })
    }

    async getFromStorage<T>(key: string): Promise<T | null> {
        const { value } = await Preferences.get({ key })

        return value ? JSON.parse(value) : null
    }

    async removeFromStorage(key: string) {
        await Preferences.remove({ key })
    }

    addCustomer(customer: CustomerRegister): Observable<RegisterSuccess> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'application/json',
        })

        return this._http
            .post<RegisterSuccess>(`${this._apiUrl}/api/register`, customer, {
                headers,
            })
            .pipe(
                catchError((error) => {
                    return throwError(() => error)
                })
            )
    }

    login(data: LoginCredentials): Observable<LoginSuccess> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'application/json',
        })

        return this._http
            .post<LoginSuccess>(`${this._apiUrl}/api/login`, data, { headers })
            .pipe(
                tap(async (response) => {
                    this._account = response.user
                    await this.saveToStorage('user', response.user)
                }),
                catchError((error) => {
                    return throwError(() => error)
                })
            )
    }

    logout(): Observable<boolean> {
        return from(this._tokenService.loadToken()).pipe(
            switchMap((token) => {
                if (!token) return of(false)

                const headers = new HttpHeaders({
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                })

                return this._http
                    .post<LogOutResponse>(
                        `${this._apiUrl}/api/logout`,
                        {},
                        { headers }
                    )
                    .pipe(
                        tap(async () => {
                            await this.removeFromStorage('user')
                            await this.removeFromStorage('persona')
                            await this._tokenService.removeToken()
                            this._persona = {} as Persona
                            this._account = {} as User
                        }),
                        map(() => true),
                        catchError(() => of(false))
                    )
            })
        )
    }

    checkAuthentication(): Observable<boolean> {
        return from(this._tokenService.loadToken()).pipe(
            switchMap((token) => {
                if (!token) return of(false)

                const headers = new HttpHeaders({
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                })

                return this._http
                    .get<Persona>(`${this._apiUrl}/api/cliente`, { headers })
                    .pipe(
                        tap(async (persona) => {
                            this._persona = persona
                            await this.saveToStorage('persona', persona)
                        }),
                        map((persona) => !!persona),
                        catchError(() => of(false))
                    )
            })
        )
    }

    async loadStoredData() {
        this._persona =
            (await this.getFromStorage<Persona>('persona')) || ({} as Persona)
        this._account =
            (await this.getFromStorage<User>('user')) || ({} as User)
    }
}
