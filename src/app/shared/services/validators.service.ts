import { Injectable } from '@angular/core'
import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms'

@Injectable({
    providedIn: 'root',
})
export class ValidatorsService {
    public namePattern: string = '^[A-Za-zÁÉÍÓÚáéíóúÑñ\\s]+$'
    public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
    public dniPattern: string = '^[0-9]{8}$'
    public celularPattern: string = '^[0-9]{9}$'
    constructor() {}

    public isFieldOneEqualFieldTwo(field1: string, field2: string) {
        return (formGroup: AbstractControl): ValidationErrors | null => {
            const fieldValue1 = formGroup.get(field1)?.value
            const fieldValue2 = formGroup.get(field2)?.value

            if (fieldValue1 !== fieldValue2) {
                formGroup.get(field2)?.setErrors({ notEqual: true })

                return { notEqual: true }
            }

            formGroup.get(field2)?.setErrors(null)

            return null
        }
    }

    public isInvalidField(form: FormGroup, field: string): boolean | null {
        return form.controls[field].errors && form.controls[field].touched
    }
}
