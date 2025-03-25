import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, Observable, throwError } from 'rxjs'
import { environment } from 'src/environments/environment'
import { CategoriaResponse } from '../interfaces/categoria.interface'
import { Reporte, ReporteSucces } from '../interfaces/reporte.interface'

@Injectable({
    providedIn: 'root',
})
export class BotonService {
    private _apiUrl: string = environment.baseUrl

    constructor(private _http: HttpClient) {}

    addReport(reporte: Reporte): Observable<ReporteSucces> {
        const headers = new HttpHeaders({
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
