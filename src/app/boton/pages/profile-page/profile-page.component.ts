import { Component, OnInit } from '@angular/core'
import { PersonaDto } from 'src/app/auth/models/dtos/persona.dto'
import { CustomerDto } from 'src/app/auth/models/dtos/customer.dto'
import { StorageService } from 'src/app/shared/services/storage.service'

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.scss'],
    standalone: false,
})
export class ProfilePageComponent implements OnInit {
    public persona: PersonaDto = {} as PersonaDto
    public customer: CustomerDto = {} as CustomerDto

    constructor(private _storageService: StorageService) {}

    async ngOnInit() {
        this.persona =
            (await this._storageService.getStorageItem('persona')) ||
            ({} as PersonaDto)
        this.customer =
            (await this._storageService.getStorageItem('user')) ||
            ({} as CustomerDto)
    }
}
