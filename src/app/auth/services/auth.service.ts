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

import { TokenService } from 'src/app/boton/services/token.service'

import { CustomerCreateRequest } from '../models/requests/customer-create.request'
import { CustomerCreateResponse } from '../models/responses/customer-create.response'
import { AuthResponse } from '../models/responses/auth.response'
import { AuthRequest } from '../models/requests/auth.request'
import { StorageService } from 'src/app/shared/services/storage.service'
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly http = inject(HttpClient)
    private readonly tokenService = inject(TokenService)
    private readonly storageService = inject(StorageService)
    private readonly apiUrl: string = environment.baseUrl

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
                tap(async ({ user, reports, persona }) => {
                    await Promise.all([
                        this.storageService.setStorageItem('user', user),
                        // this.storageService.setStorageItem('reports', reports),
                        this.storageService.setStorageItem('persona', persona),
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

    // passwordRecover(
    //     customer: CustomerCreateRequest
    // ): Observable<CustomerCreateResponse> {
    // }

    checkAuthentication(): Observable<boolean> {
        return from(this.tokenService.loadToken()).pipe(map((token) => !!token))
    }

    private async clearAuthData(): Promise<void> {
        await this.storageService.clearStorage()
    }
}
