import { User } from './user.interface'

export interface LoginError {
    message: string
    errors: Errors
}

export interface LoginCredentials {
    username: string
    password: string
}

export interface Errors {
    username: string[]
}

export interface LoginSuccess {
    token: string
    role: string
    user: User
}
