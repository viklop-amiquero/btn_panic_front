import { Component, OnInit } from '@angular/core'
import { BotonService } from '../../services/boton.service'
import { CustomerReportDto } from '../../models/dtos/customer-reports-paged.dto'
import { AlertService } from 'src/app/shared/services/alert.service'
import { ToastService } from 'src/app/shared/services/toast.service'

@Component({
    selector: 'app-list-reports-page',
    templateUrl: './list-reports-page.component.html',
    styleUrls: ['./list-reports-page.component.scss'],
    standalone: false,
})
export class ListReportsPageComponent implements OnInit {
    public reports!: CustomerReportDto[]

    constructor(
        private _botonService: BotonService,
        private _alertService: AlertService,
        private _toastService: ToastService
    ) {}

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

    async deleteReport(id: number) {
        const item = 'el reporte'
        const confirm = await this._alertService.showDeleteConfirmation(item)

        if (!confirm) {
            return
            // console.log(!!confirm)
            // console.log(confirm)
            // console.log('eliminación cancelada.')
            // return
        }
        this._botonService.deleteCustomerReport(id).subscribe({
            next: (value) => {
                if (!value) {
                    this._toastService.showToast(
                        'No se pudo completar la operación.',
                        'danger'
                    )
                }
                this._toastService.showToast(
                    'Reporte eliminado exitosamente.',
                    'success'
                )

                // Actualizar el arreglo
                this.reports = this.reports.map((report) =>
                    report.id === id ? { ...report, estado: '0' } : report
                )
            },
            error: () => {
                this._toastService.showToast(
                    'Ocurrió un error, intentelo más tarde.',
                    'danger'
                )
            },
        })
    }
}
