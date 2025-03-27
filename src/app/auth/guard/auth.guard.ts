import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { Observable, tap } from 'rxjs'
import { AuthService } from '../services/auth.service'

const checkAuthStatus = (): Observable<boolean> => {
    const authService: AuthService = inject(AuthService)
    const router: Router = inject(Router)

    return authService.checkAuthentication().pipe(
        tap((isAuthenticaded) => {
            if (!isAuthenticaded) {
                router.navigateByUrl('auth')
            }
        })
    )
}

export const authGuard: CanActivateFn = (route, state) => {
    return checkAuthStatus()
}
