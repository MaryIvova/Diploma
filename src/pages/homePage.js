import { expect } from '@playwright/test';

export class HomePage {
    constructor(page) {
        this.page = page;
        this.getTagByText = (text) => this.page.locator(`.sidebar button:has-text("${text}")`);
        this.pagination = page.getByRole('navigation', { name: 'Pagination' });
        this.pageButton = (pageNumber) =>
            this.pagination.locator(`a[role="button"][aria-label="Page ${pageNumber}"]`);
        this.article = (text) => page.locator(`.article-preview:has-text("${text}")`);
        this.likeButton = (title) => this.article(title).locator('button.btn-outline-primary');
        this.userButton = page.locator('//*[@class="nav-link dropdown-toggle cursor-pointer"]');
        this.dropDownProfile = page.locator('//*[@class="dropdown-menu"]');
        this.buttonProfile = page.locator('.ion-person').locator('..');
        this.favoritesButton = page.locator('//*[text()="Favorited Articles"]');
    }

    async openTag(tag) {
        await this.getTagByText(tag).click();
    }

    async openPage(pageNumber, title) {
        await this.pageButton(pageNumber).click();
        const activePage = this.pagination.locator(
            `.page-item.active >> a[aria-label*="Page ${pageNumber}"]`,
        );
        await expect(activePage).toBeVisible();
    }

    async likeArticle(title) {
        await this.likeButton(title).click();
    }
}
