import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'
@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.scss'],
    standalone: false,
})
export class MainLayoutComponent implements OnInit {
    ngOnInit(): void {}

    @ViewChild('mainContent', { static: false }) mainContent!: ElementRef
    @ViewChild('firstItem', { static: false }) firstMenuItem!: ElementRef
    @ViewChild('menuButton', { static: false }) menuButton!: ElementRef

    handleMenuOpen() {
        setTimeout(() => {
            if (this.firstMenuItem?.nativeElement) {
                this.firstMenuItem.nativeElement.focus()
            }
            this.mainContent?.nativeElement.setAttribute('aria-hidden', 'true') // Oculta el contenido principal de los lectores de pantalla
        }, 100)
    }

    handleMenuClose() {
        setTimeout(() => {
            if (this.menuButton?.nativeElement) {
                this.menuButton.nativeElement.focus() // Devuelve el foco al botón del menú
            }
            this.mainContent?.nativeElement.removeAttribute('aria-hidden')
        }, 100)
    }
}
