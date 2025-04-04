import { Component, OnInit } from '@angular/core'
import { BotonService } from '../../services/boton.service'
import { CustomerReportDto } from '../../models/dtos/customer-reports-paged.dto'

@Component({
    selector: 'app-list-reports-page',
    templateUrl: './list-reports-page.component.html',
    styleUrls: ['./list-reports-page.component.scss'],
    standalone: false,
})
export class ListReportsPageComponent implements OnInit {
    public reports!: CustomerReportDto[]

    constructor(private _botonService: BotonService) {}

    getReports() {
        this._botonService.getReports().subscribe(({ data }) => {
            // console.log(data)
            this.reports = data
            // this.reports = data
        })
    }

    ngOnInit() {
        this.getReports()
    }

    getEstadoText(estado: string): string {
        switch (estado) {
            case '1':
                return 'Reportado'
            case '0':
                return 'Anulado'
            case '2':
                return 'Atendido'
            default:
                return 'Desconocido'
        }
    }

    getEstadoClass(estado: string): string {
        switch (estado) {
            case '1':
                return 'estado-reportado' // Amarillo
            case '0':
                return 'estado-anulado' // Rojo
            case '2':
                return 'estado-atendido' // Verde
            default:
                return 'estado-desconocido'
        }
    }

    deleteReport(id: number) {}
}
