export interface CustomerDto {
    id: number
    persona_id: number
    clave_id: number
    username: string
    verificado: null
    estado: string
    usuario_crea?: number
    usuario_modifica?: number
    created_at: string
    updated_at?: string
}
