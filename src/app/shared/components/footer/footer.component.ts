import { Component, OnInit } from '@angular/core'
import { Browser } from '@capacitor/browser'
@Component({
    selector: 'shared-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: false,
})
export class FooterComponent implements OnInit {
    public year = new Date()

    constructor() {}

    ngOnInit() {}

    async openExternalLink() {
        await Browser.open({
            url: 'https://viklop-amiquero.github.io/personal-web-site/',
            toolbarColor: '#FFFFFF',
        })
    }
}
