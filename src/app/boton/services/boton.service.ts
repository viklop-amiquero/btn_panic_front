import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, Observable, throwError } from 'rxjs'
import { environment } from 'src/environments/environment'
import { CategoriaResponse } from '../interfaces/categoria.interface'
import { Reporte, ReporteSucces } from '../interfaces/reporte.interface'
import { Geolocation } from '@capacitor/geolocation'

@Injectable({
    providedIn: 'root',
})
export class BotonService {
    private _apiUrl: string = environment.baseUrl

    constructor(private _http: HttpClient) {}

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

    addReport(reporte: Reporte, token: string): Observable<ReporteSucces> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        })

        return this._http
            .post<ReporteSucces>(`${this._apiUrl}/api/reporte`, reporte, {
                headers,
            })
            .pipe(
                catchError((error) => {
                    return throwError(() => error) // Propagar el error al componente
                })
            )
    }

    getCategories(token: string): Observable<CategoriaResponse> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        })

        return this._http
            .get<CategoriaResponse>(`${this._apiUrl}/api/categoria`, {
                headers,
            })
            .pipe(
                catchError((error) => {
                    return throwError(() => error)
                })
            )
    }
}
