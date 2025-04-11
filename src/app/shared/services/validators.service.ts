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

    getErrorMessage(field: string, form: FormGroup): string | null {
        const control = form.get(field)
        if (!control || !control.errors || !control.touched) return null

        if (control.errors['required']) {
            return 'Este campo es obligatorio.'
        }

        if (control.errors['minlength']) {
            const requiredLength = control.errors['minlength'].requiredLength
            return `Debe tener al menos ${requiredLength} caracteres.`
        }

        if (control.errors['pattern']) {
            switch (field) {
                case 'name':
                case 'apellido':
                    return 'Solo se permiten letras.'
                case 'dni':
                    return 'El DNI no es válido.'
                case 'telefono':
                    return 'El celular no es válido.'
                case 'email':
                    return 'Ingrese un email válido.'
                case 'password':
                    return 'Debe contener letras y números.'
            }
        }

        if (control.errors['notEqual']) {
            return 'Las contraseñas no coinciden.'
        }

        return 'Campo inválido.'
    }
}
