import { CanActivateFn, Router } from '@angular/router'
import { Observable, tap, map } from 'rxjs'
import { AuthService } from '../services/auth.service'
import { inject } from '@angular/core'

const checkAuthStatus = (): Observable<boolean> => {
    const authService: AuthService = inject(AuthService)
    const router: Router = inject(Router)

    return authService.checkAuthentication().pipe(
        tap((isAuthenticaded) => {
            if (isAuthenticaded) {
                router.navigateByUrl('home')
            }
        }),
        map((isAuthenticaded) => !isAuthenticaded)
    )
}

export const publicActivateGuard: CanActivateFn = (route, state) => {
    return checkAuthStatus()
}
