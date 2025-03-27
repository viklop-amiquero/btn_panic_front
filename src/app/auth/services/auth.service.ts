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

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _apiUrl: string = environment.baseUrl
    private _persona?: Persona
    private _account?: User
    constructor(
        private _http: HttpClient,
        private _tokenService: TokenService
    ) {}

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
                tap((data) => (this._account = data.user)),
                catchError((error) => {
                    return throwError(() => error)
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
                        tap((persona) => (this._persona = persona)),
                        map((persona) => !!persona),
                        catchError(() => of(false))
                    )
            })
        )
    }
}
