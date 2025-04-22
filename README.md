                APP BOTON DE PÁNICO BACKEND
                --------------------------

Proyecto creado con las versiones:
Angular CLI: 19.1.4
Node: 22.13.1
Package Manager: npm 10.9.2
Ionic: 7.2.0


    INSTALACIÓN
    -----------
git clone https://github.com/viklop-amiquero/btn_panic_front.git
npm install
ionic serve

    CONFIGURACIÓN
    -------------
environment.ts

LOCAL     :     'http://127.0.0.1:8000',
PRODUCCIÓN:     'https://botondepanico.muniandresavelinocaceresdorregaray.gob.pe',

    PRODUCCIÓN
    ----------
ionic build
npx cap sync
npx cap open android
