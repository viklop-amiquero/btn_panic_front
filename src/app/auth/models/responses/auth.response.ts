import { Reporte } from 'src/app/models/domain/reporte.interface'
import { Customer } from '../../../models/domain/customer.interface'

export interface AuthResponse {
    token: string
    role: string
    user: Customer
    reports: Reporte[]
}
