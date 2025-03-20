import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Preferences } from '@capacitor/preferences'

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    standalone: false,
})
export class HomePageComponent implements OnInit {
    private _fb: FormBuilder = new FormBuilder()
    private token!: string

    constructor() {}

    public btnForm: FormGroup = this._fb.group({
        categoria_id: ['', Validators.required],
        descripcion: ['', Validators.required],
    })

    // onSubmit(){

    // }

    async loadToken() {
        const { value } = await Preferences.get({ key: 'authToken' })
        this.token = value || ''
    }

    ngOnInit() {
        this.loadToken().then(() => {
            console.log(this.token)
        })
    }
}
