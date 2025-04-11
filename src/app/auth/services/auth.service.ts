import { HttpClient, HttpHeaders } from '@angular/common/http'
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

// import { Preferences } from '@capacitor/preferences'

import { TokenService } from 'src/app/boton/services/token.service'

import { CustomerCreateRequest } from '../models/requests/customer-create.request'
import { CustomerCreateResponse } from '../models/responses/customer-create.response'
import { AuthResponse } from '../models/responses/auth.response'
import { AuthRequest } from '../models/requests/auth.request'
import { Persona } from '../../models/domain/persona.interface'
import { Customer } from '../../models/domain/customer.interface'
import { StorageService } from 'src/app/shared/services/storage.service'
import { CustomerReportDto } from 'src/app/boton/models/dtos/customer-reports-paged.dto'
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly http = inject(HttpClient)
    private readonly tokenService = inject(TokenService)
    private readonly storageService = inject(StorageService)
    private readonly apiUrl: string = environment.baseUrl

    public _persona: Persona | null = null
    public _account: Customer | null = null
    public reports: CustomerReportDto[] | null = null

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

    login(data: AuthRequest): Observable<AuthResponse> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'application/json',
        })

        return this.http
            .post<AuthResponse>(`${this.apiUrl}/api/login`, data, { headers })
            .pipe(
                tap(async (response) => {
                    // console.log({
                    //     user: response.user,
                    //     reportes: response.reports,
                    // })
                    this._account = response.user
                    // this.reports = response.reports
                    await Promise.all([
                        this.storageService.setStorageItem(
                            'user',
                            response.user
                        ),
                        this.storageService.setStorageItem(
                            'reports',
                            response.reports
                        ),
                    ])
                }),
                catchError((error) => {
                    return throwError(() => error)
                })
            )
    }

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
                            await this.storageService.setStorageItem(
                                'persona',
                                persona
                            )
                        }),
                        map(() => true),
                        catchError(() => of(false))
                    )
            ),
            catchError(() => of(false))
        )
    }

    async loadStoredData(): Promise<void> {
        this._persona = await this.storageService.getStorageItem<Persona>(
            'persona'
        )
        this._account = await this.storageService.getStorageItem<Customer>(
            'user'
        )
    }

    private async clearAuthData(): Promise<void> {
        await Promise.all([
            this.tokenService.removeToken(),
            this.storageService.removeStorageItem('user'),
            this.storageService.removeStorageItem('persona'),
        ])
        this._persona = null
        this._account = null
    }
}
