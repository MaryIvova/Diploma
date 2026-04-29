import { test } from '@playwright/test';

export class BasePage {
    constructor(page) {
        this.page = page;
    }
    async open() {
        return test.step(`Open main page`, async (step) => {
            await this.page.goto('/');
        });
    }
}
