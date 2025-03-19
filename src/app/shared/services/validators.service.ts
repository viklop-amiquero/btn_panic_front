import { Injectable } from '@angular/core'
import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms'

@Injectable({
    providedIn: 'root',
})
export class ValidatorsService {
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
