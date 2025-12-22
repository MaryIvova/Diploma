import { test } from '@playwright/test';

export class MainPage {
    constructor(page) {
        this.signupLink = page.getByRole('link', { name: 'Sign up' });
        this.loginLink = page.getByRole('link', { name: 'Login' });
    }

    async gotoRegister() {
        return test.step('Переход на страницу регистрации', async (step) => {
            await this.signupLink.click();
        });
    }
}
