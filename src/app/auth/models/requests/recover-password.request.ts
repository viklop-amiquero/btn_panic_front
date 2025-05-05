export interface RecoverPasswordRequest {
    email: string
    dni: string
    digito_verificador: string
    password: string
    password_confirmation: string
}
