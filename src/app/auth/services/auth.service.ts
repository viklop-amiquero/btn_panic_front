import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { CustomerRegister } from '../interfaces/customer.interface'
import { catchError, Observable, of } from 'rxjs'
import {
    RegisterError,
    RegisterSuccess,
} from '../interfaces/register.interface'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _baseUrl: string = environment.baseUrl

    constructor(private _http: HttpClient) {}

    addCustomer(
        customer: CustomerRegister
    ): Observable<RegisterError | RegisterSuccess> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Accept: 'application/json',
        })

        return this._http.post<RegisterError | RegisterSuccess>(
            `${this._baseUrl}/api/register`,
            customer,
            {
                headers,
            }
        )
        // .pipe(catchError((resp: RegisterError) => of(resp)))
    }
}
