// export const RoutesName = {
//     AUTH: 'auth',
//     LOGIN: 'login',
//     REGISTER: 'register',
//     INDEX: 'index',
//     PROFILE: 'profile',
//     REPORTS: 'reports',
// }
// export const RoutesName = {
//     AUTH: { route: 'auth', name: '' },
//     LOGIN: { route: 'login', name: '' },
//     REGISTER: { route: 'register', name: '' },
//     INDEX: { route: 'index', name: 'Inicio' },
//     PROFILE: { route: 'profile', name: 'Mi cuenta' },
//     REPORTS: { route: 'reports', name: 'Mi actividad' },
// }
export const RoutesName = {
    AUTH: { route: 'auth', name: '', icon: 'lock-closed-outline' },
    LOGIN: { route: 'login', name: '', icon: 'log-in-outline' },
    REGISTER: { route: 'register', name: '', icon: 'person-add-outline' },
    INDEX: { route: '', name: 'Inicio', icon: 'home-outline' },
    PROFILE: { route: 'profile', name: 'Mi cuenta', icon: 'person-outline' },
    REPORTS: {
        route: 'reports',
        name: 'Mi actividad',
        icon: 'bar-chart-outline',
    },
}
