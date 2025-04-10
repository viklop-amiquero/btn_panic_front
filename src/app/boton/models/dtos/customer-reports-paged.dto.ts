export interface CustomerReportsPagedDto {
    data: CustomerReportDto[]
    links: Links
    meta: Meta
}

export interface CustomerReportDto {
    id: number
    imagen: null
    descripcion: string
    categoria: string
    direccion: string
    usuario_nombre?: string
    usuario_apellido?: string
    cliente_nombre: string
    cliente_apellido: string
    latitud: string
    longitud: string
    estado: string
    usuario_crea?: number
    usuario_modifica?: number
    created_at: string
    created_date: string
    updated_at?: string
    updated_date?: string
}

interface Links {
    first: string
    last: string
    prev: null
    next: null
}

interface Meta {
    current_page: number
    from: number
    last_page: number
    links: Link[]
    path: string
    per_page: number
    to: number
    total: number
}

interface Link {
    url: null | string
    label: string
    active: boolean
}
