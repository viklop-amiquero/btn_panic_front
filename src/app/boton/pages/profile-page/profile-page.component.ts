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
    public persona: Persona = {} as Persona
    public user: User = {} as User
    constructor(private _authService: AuthService) {}

    async ngOnInit() {
        await this._authService.loadStoredData()

        this.persona = this._authService._persona || ({} as Persona)
        this.user = this._authService._account || ({} as User)
    }
}
