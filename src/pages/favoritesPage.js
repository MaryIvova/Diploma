import {expect, test} from '@playwright/test';

export class FavoritesPage {
    constructor(page) {
        this.page = page;
        this.buttonFavorites = page.locator('a.nav-link:has-text("Favorited")');
        this.article = (text) => page.locator(`.article-preview:has-text("${text}")`);
        this.likeButton = (title) => this.article(title).locator('button.btn-outline-primary');
    }

    async checkFavorites(title) {
        return test.step(`Check favorites `, async (step) => {
            await this.buttonFavorites.click();
        });
    }

    async unLikeArticle(title) {
        return test.step(`Unlike Article`, async (step) => {
            await this.likeButton(title).click();
        });
    }
}
