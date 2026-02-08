import {expect, test} from '@playwright/test';

export class HomePage {
    constructor(page) {
        this.page = page;
        this.getTagByText = (text) => this.page.locator(`.sidebar button:has-text("${text}")`);
        this.pagination = page.locator('.pagination');
        this.pageItem = (pageNumber) => page.locator(`.pagination .page-link:has-text("${pageNumber}")`)
        this.pageButton = (pageNumber) =>
            this.pagination.locator(`a[role="button"][aria-label="Page ${pageNumber}"]`);
        this.article = (text) => page.locator(`.article-preview:has-text("${text}")`);
        this.likeButton = (title) => this.article(title).locator('button.btn-outline-primary');
    }

    pageButton(pageNumber) {
        return this.pagination.locator(`a[role="button"][aria-label="Page ${pageNumber}"]`);
    }

    async openTag(tag) {
        return test.step(`Open tag  `, async (step) => {
            await this.getTagByText(tag).click();
        });
    }

    async filterPagination() {
        // Get all page links and extract numbers
        const pageLinks = this.pagination.locator('.page-link');
        const count = await pageLinks.count();

        const numbers = [];
        for (let i = 0; i < count; i++) {
            const text = await pageLinks.nth(i).textContent();
            const num = parseInt(text.trim());
            if (!isNaN(num)) {
                numbers.push(num);
            }
        }

        return numbers.length ? Math.max(...numbers) : 1;
    }

    async selectPagination () {
       await this.filterPagination().then(pageCount => {
            return this.pageItem(pageCount).click();
        });
    }

    async likeArticle(title) {
        return test.step(`Like Article  `, async (step) => {
            await this.likeButton(title).click();
        });
    }
}
