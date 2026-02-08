import {test} from '@playwright/test';

export class LogInPage {
    constructor(page) {
        this.page = page;
        this.userLogInButton = page.locator('.ion-log-in');
        this.emailField = page.locator('[name="email"]');
        this.pwdField = page.locator('[name="password"]');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async userLogIn() {
        return test.step(`current user log in  `, async (step) => {
            await this.page.goto('/');
            await this.userLogInButton.click();
            const email = process.env.TEST_EMAIL;
            const password = process.env.TEST_PASSWORD;
            await this.emailField.fill(email);
            await this.pwdField.click();
            await this.pwdField.fill(password);
            await this.loginButton.click();
        });
    }
}
