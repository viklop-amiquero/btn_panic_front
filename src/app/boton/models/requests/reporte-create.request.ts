export interface ReporteCreateRequest {
    descripcion: string
    direccion: string
    imagen?: string
    categoria_id: string
    latitud?: number
    longitud?: number
}
