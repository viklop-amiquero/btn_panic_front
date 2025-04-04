export interface CustomerErrorResponse {
    message: string
    errors: Errors
}

interface Errors {
    name?: string[]
    apellido?: string[]
    direccion_domicilio?: string[]
    telefono?: string[]
    email?: string[]
    password?: string[]
}
