import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'shared-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false,
})
export class HeaderComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
