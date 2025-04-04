export interface PersonaDto {
    id: number
    nombre: string
    apellido: string
    direccion_domicilio: string
    dni: string
    telefono: string
    estado: string
    usuario_crea?: number
    usuario_modifica?: number
    created_at: string
    updated_at?: string
}
