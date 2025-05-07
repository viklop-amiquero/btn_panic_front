export class PasswordVisibilityHandler {
    public show: boolean = false

    toggle(): void {
        this.show = !this.show
    }

    get inputType(): 'text' | 'password' {
        return this.show ? 'text' : 'password'
    }

    get icon(): string {
        return this.show ? 'eye-off-outline' : 'eye-outline'
    }
}
