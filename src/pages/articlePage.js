import { test, expect } from '@playwright/test';
import { title } from 'process';
import { MyArticlesPage } from './index';

export class ArticleEdit extends MyArticlesPage {
    constructor(page) {
        super(page);
        this.page = page;
        this.buttonDelete = page.getByRole('button', { name: ' Delete Article' }).first();
        this.buttonEdit = page.getByRole('link', { name: 'Edit Article' }).first();
        this.buttonUpdate = page.locator('//*[@class="btn btn-lg pull-xs-right btn-primary"]');
        this.articleDescription2 = page.locator('//input[@name = "description"]');
    }
    getArticlePreview = (text) => {
        return this.page.locator(`//*[text()='${text}']`);
    };
    async editCreatedArticle(article) {
        return test.step(`Edite articled article`, async (step) => {
            const locator = this.getArticlePreview(article.title);
            await locator.click();
            await expect(this.buttonEdit).toBeVisible();
            await this.buttonEdit.click();
            await this.articleDescription2.click();
            await this.articleDescription2.fill(article.description);
            await this.buttonUpdate.click();
        });
      }

    async deleteArticle(article) {
        return test.step(`Create article`, async (step) => {
        const locator = this.getArticlePreview(article.title);
        await locator.click();
        const button = this.buttonDelete;
        this.page.once('dialog', (dialog) => {
            console.log('Dialog message: ${dialog.message()}');
            dialog.accept();
        });
        await button.click();
        });
    }
}
