export interface ReporteAddSucces {
    message: string
}

export interface ReporteRegister {
    descripcion: string
    direccion: string
    imagen?: string
    categoria_id: string
    latitud?: number
    longitud?: number
}
