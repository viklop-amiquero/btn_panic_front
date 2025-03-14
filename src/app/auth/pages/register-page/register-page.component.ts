import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: 'app-register-page',
    standalone: false,
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
    private _fb: FormBuilder = new FormBuilder()

    constructor() {}

    public registerForm: FormGroup = this._fb.group({
        nombre: [''],
        apellido: [''],
        email: [''],
        telefono: [''],
    })

    ngOnInit() {}

    submitForm() {}
}
