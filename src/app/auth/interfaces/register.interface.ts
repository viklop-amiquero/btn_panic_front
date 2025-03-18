import { CustomerRegister } from './customer.interface'

export interface RegisterError {
    message: string
    errors: Errors
    // errors: Partial<Record<keyof CustomerRegister, string[]>>
}

export interface RegisterSuccess {
    message: string
    token: string
}

export interface Errors {
    name?: string[]
    apellido?: string[]
    direccion_domicilio?: string[]
    telefono?: string[]
    email?: string[]
    password?: string[]
}
