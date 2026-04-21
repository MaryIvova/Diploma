import { test } from '@playwright/test';

export class BasePage {
    async open() {
        return test.step(`Переход на страницу {$URL}`, async (step) => {
            await this.page.goto('/');
        });
    }
}
