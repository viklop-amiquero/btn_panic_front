import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { CustomerRegister } from '../interfaces/customer.interface'
import { catchError, Observable, throwError } from 'rxjs'
import { RegisterSuccess } from '../interfaces/register.interface'
import { LoginCredentials, LoginSuccess } from '../interfaces/login.interface'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _baseUrl: string = environment.baseUrl

    constructor(private _http: HttpClient) {}

    addCustomer(customer: CustomerRegister): Observable<RegisterSuccess> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'application/json',
        })

        return this._http
            .post<RegisterSuccess>(`${this._baseUrl}/api/register`, customer, {
                headers,
            })
            .pipe(
                catchError((error) => {
                    return throwError(() => error) // Propagar el error al componente
                })
            )
    }

    login(data: LoginCredentials): Observable<LoginSuccess> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'application/json',
        })

        return this._http
            .post<LoginSuccess>(`${this._baseUrl}/api/login`, data, { headers })
            .pipe(
                catchError((error) => {
                    return throwError(() => error) // Propagar el error al componente
                })
                // catchError((error) => {
                //     let errorMessage = 'Ocurrió un error inesperado.'

                //     if (error.status === 500) {
                //         // Si el error contiene "SQLSTATE[HY000] [2002]" es un problema de conexión a la BD
                //         if (
                //             error.error?.message?.includes(
                //                 'SQLSTATE[HY000] [2002]'
                //             )
                //         ) {
                //             errorMessage =
                //                 'Error de conexión con el servidor. Inténtelo más tarde.'
                //         } else {
                //             errorMessage =
                //                 'Error interno del servidor. Inténtelo más tarde.'
                //         }
                //     } else if (error.error?.message) {
                //         errorMessage = error.error.message
                //     }

                //     return throwError(() => ({
                //         ...error,
                //         customMessage: errorMessage,
                //     }))
                // })
            )
    }
}
