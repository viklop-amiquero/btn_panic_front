import { Reporte } from 'src/app/models/domain/reporte.interface'
import { Customer } from '../../../models/domain/customer.interface'
import { CustomerReportDto } from 'src/app/boton/models/dtos/customer-reports-paged.dto'
import { CustomerDto } from '../dtos/customer.dto'
import { PersonaDto } from '../dtos/persona.dto'

export interface AuthResponse {
    token: string
    role: string
    user: CustomerDto
    reports: CustomerReportDto[]
    persona: PersonaDto
}
