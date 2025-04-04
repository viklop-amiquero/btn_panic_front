export interface AuthErrorResponse {
    message: string
    errors: Errors
}

interface Errors {
    username: string[]
}
