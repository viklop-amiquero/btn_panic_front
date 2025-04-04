import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, Observable, throwError, from, switchMap } from 'rxjs'

import { Geolocation } from '@capacitor/geolocation'

import { environment } from 'src/environments/environment'
import { TokenService } from './token.service'
import { ReporteCreateRequest } from '../models/requests/reporte-create.request'
import { ReporteCreateResponse } from '../models/responses/reporte-create.response'
import { CustomerReportsPagedDto } from '../models/dtos/customer-reports-paged.dto'
import { CategoriaListDto } from '../models/dtos/categoria-list.dto'

@Injectable({
    providedIn: 'root',
})
export class BotonService {
    private _apiUrl: string = environment.baseUrl

    constructor(
        private _http: HttpClient,
        private _tokenService: TokenService
    ) {}

    async getLocation(): Promise<{ latitud: number; longitud: number }> {
        try {
            const position = await Geolocation.getCurrentPosition()
            return {
                latitud: position.coords.latitude,
                longitud: position.coords.longitude,
            }
        } catch (error) {
            // console.error('Error obteniendo la ubicación:', error)
            throw new Error('No se pudo obtener la ubicación')
        }
    }

    private getHeaders(token: string): HttpHeaders {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        })

        return headers
    }

    CreateReport(
        reporte: ReporteCreateRequest,
        token: string
    ): Observable<ReporteCreateResponse> {
        return this._http
            .post<ReporteCreateResponse>(
                `${this._apiUrl}/api/reporte`,
                reporte,
                {
                    headers: this.getHeaders(token),
                }
            )
            .pipe(
                catchError((error) => {
                    return throwError(() => error)
                })
            )
    }

    getCategories(token: string): Observable<CategoriaListDto> {
        return this._http
            .get<CategoriaListDto>(`${this._apiUrl}/api/categoria`, {
                headers: this.getHeaders(token),
            })
            .pipe(
                catchError((error) => {
                    return throwError(() => error)
                })
            )
    }

    getReports(): Observable<CustomerReportsPagedDto> {
        return from(this._tokenService.loadToken()).pipe(
            switchMap((token) => {
                return this._http.get<CustomerReportsPagedDto>(
                    `${this._apiUrl}/api/reporte`,
                    {
                        headers: this.getHeaders(token),
                    }
                )
            }),
            catchError((error) => throwError(() => error))
        )
    }
}
