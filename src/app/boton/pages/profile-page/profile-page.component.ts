import { Component, OnInit } from '@angular/core'
import { Persona } from 'src/app/models/domain/persona.interface'
import { AuthService } from 'src/app/auth/services/auth.service'
import { Customer } from 'src/app/models/domain/customer.interface'

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.scss'],
    standalone: false,
})
export class ProfilePageComponent implements OnInit {
    public persona: Persona = {} as Persona
    public customer: Customer = {} as Customer
    constructor(private _authService: AuthService) {}

    async ngOnInit() {
        await this._authService.loadStoredData()

        this.persona = this._authService._persona || ({} as Persona)
        this.customer = this._authService._account || ({} as Customer)
    }
}
