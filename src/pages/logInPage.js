import { expect } from '@playwright/test';

export class LogInPage {
    constructor(page) {
        this.page = page;
        this.userLogInButton = page.locator('.ion-log-in');
        this.emailField = page.locator('[name="email"]');
        this.pwdField = page.locator('[name="password"]');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async userLogIn() {
        await this.userLogInButton.click();
        await this.emailField.fill('muravjed@list.ru');
        await this.pwdField.click();
        await this.pwdField.fill('Asdasd,123');
        await this.loginButton.click();
    }
}
