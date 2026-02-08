import {expect, test} from '@playwright/test';

export class MyArticlesPage {
    constructor(page) {
        this.page = page;
        this.userButton = page.locator('//*[@class="nav-link dropdown-toggle cursor-pointer"]');
        this.dropDownProfile = page.locator('//*[@class="dropdown-menu"]');
        this.buttonProfile = page.locator('.ion-person').locator('..');
    }
    getArticlePreview = (text) => {
        return this.page.locator(`//*[text()='${text}']`);
    };
    async checkCreatedArticle(article) {
        return test.step(`Check created article `, async (step) => {
            const locator = this.getArticlePreview(article.title);
            return locator;
        });
    }

    async checkDeletedArticle(article) {
        return test.step(`Check deleted article`, async (step) => {
            await this.userButton.click();
            await expect(this.dropDownProfile).toBeVisible();
            await this.buttonProfile.click();
        });
    }
}
