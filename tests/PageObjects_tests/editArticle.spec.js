import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';
import { ArticleBuilder } from '../../src/builders/index';
import { ArticleCreation, MyArticlesPage, ArticleEdit, LogInPage } from '../../src/pages/index';

const URL = 'https://realworld.qa.guru';

test.describe('Логин', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
        const logInPage = new LogInPage(page);
        await logInPage.userLogIn();
    });

    test('Edit My articles @PO', async ({ page }) => {
        const article = new ArticleBuilder()
            .addTitle()
            .addDescription()
            .addText()
            .addTags()
            .generate();

        const newArticle = new ArticleCreation(page);
        await newArticle.createArticle(article);

        const myArticlesPage = new MyArticlesPage(page);
        await myArticlesPage.checkCreatedArticle(article);
        const locator = myArticlesPage.getArticlePreview(article.title);
        await expect(locator).toHaveText(article.title);

        article.description = faker.word.adjective();

        const editArticte = new ArticleEdit(page);
        const locator2 = editArticte.getArticlePreview(article.title);
        await expect(locator2).toHaveText(article.title);
        await editArticte.editCreatedArticle(article);
    });
});
