import { expect } from '@playwright/test';
import { title } from 'process';

export class ArticleCreation {
    constructor(page) {
        this.buttonNewArticle = page.locator('//*[text()="New Article"]');
        this.articleTitle = page.locator('//*[@class="form-control form-control-lg"]');
        this.articleDescription = page.getByRole('textbox', { name: "What's this article about?" });
        this.articleText = page.locator('[name="body"]');
        this.articleTags = page.locator('[name="tags"]');
        this.publishButton = page.locator('//*[@class="btn btn-lg pull-xs-right btn-primary"]');
        this.articleTT = page.locator('//*[class="col-md-12"]');
    }

    async createArticle(article) {
        const { title, description, text, tags } = article;
        await this.buttonNewArticle.click();
        //await expect(this.articleTitle).toBeVisible();
        await this.articleTitle.fill(title);
        await this.articleDescription.click();
        await this.articleDescription.fill(description);
        await this.articleText.fill(text);
        await this.articleTags.fill(tags);
        await this.publishButton.click();
    }
}
