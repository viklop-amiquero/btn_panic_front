import { Component, Input, OnInit } from '@angular/core'

@Component({
    selector: 'header-auth',
    templateUrl: './header-auth.component.html',
    styleUrls: ['./header-auth.component.scss'],
    standalone: false,
})
export class HeaderAuthComponent implements OnInit {
    @Input()
    public title!: string

    constructor() {}

    ngOnInit() {}
}
