import { expect } from '@playwright/test';
import { title } from 'process';

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
        const locator = this.getArticlePreview(article.title);
        return locator;
    }

    async checkDeletedArticle(article) {
        await this.userButton.click();
        await expect(this.dropDownProfile).toBeVisible();
        await this.buttonProfile.click();
    }
}
