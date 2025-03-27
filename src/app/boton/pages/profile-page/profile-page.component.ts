import { Component, OnInit } from '@angular/core'
import { Persona } from 'src/app/auth/interfaces/persona.interface'
import { User } from 'src/app/auth/interfaces/user.interface'
import { AuthService } from 'src/app/auth/services/auth.service'

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.scss'],
    standalone: false,
})
export class ProfilePageComponent implements OnInit {
    public persona!: Persona
    public user!: User
    constructor(private _authService: AuthService) {}

    getPersona() {
        // this.user = this._authService._account
        if (this._authService._persona) {
            this.persona = this._authService._persona
            // console.log(this._authService._account)
        }
    }

    ngOnInit() {
        this.getPersona()
        // this._authService.checkAuthentication().subscribe((isAuthenticated) => {
        //     if (isAuthenticated) {
        //     }
        // })
    }
}
