import { Component, OnInit } from '@angular/core'
import { RoutesName } from 'src/app/shared/routes/routes'
@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.scss'],
    standalone: false,
})
export class MainLayoutComponent implements OnInit {
    public routesName = RoutesName
    ngOnInit(): void {}
}
