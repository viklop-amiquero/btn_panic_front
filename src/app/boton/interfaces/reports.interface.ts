export interface ReportsResponse {
    data: Report[]
    links: Links
    meta: Meta
}

export interface Report {
    id: number
    imagen: null
    descripcion: string
    categoria: string
    direccion: string
    usuario_nombre: string
    usuario_apellido: string
    cliente: string
    latitud: string
    longitud: string
    estado: string
    created_at: string
    created_date: string
}

export interface Links {
    first: string
    last: string
    prev: null
    next: null
}

export interface Meta {
    current_page: number
    from: number
    last_page: number
    links: Link[]
    path: string
    per_page: number
    to: number
    total: number
}

export interface Link {
    url: null | string
    label: string
    active: boolean
}
