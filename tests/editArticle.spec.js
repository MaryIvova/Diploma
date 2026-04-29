import { faker } from '@faker-js/faker';
import { expect } from '@playwright/test';
import { test } from '../src/fixture_PO/index';
import { ArticleBuilder } from '../src/builders';
import { ArticleCreation, MyArticlesPage, ArticleEdit, LogInPage } from '../src/pages';

test.describe('Логин', () => {
    test.beforeEach(async ({ page }) => {
        const logInPage = new LogInPage(page);
        await logInPage.userLogIn();
    });

    test('Edit My articles @e2e', async ({ webApp }) => {
        const article = new ArticleBuilder()
            .addTitle()
            .addDescription()
            .addText()
            .addTags()
            .generate();

        await webApp.articleCreate.createArticle(article);

        await webApp.myArticlesPage.checkCreatedArticle(article);

        const locator = webApp.myArticlesPage.getArticlePreview(article.title);
        await expect(locator).toBeVisible();

        /*await webApp.myArticlesPage.checkCreatedArticle(article);
        const locator = webApp.myArticlesPage.getArticlePreview(article.title);
        await expect(locator).toHaveText(article.title);*/

        article.description = faker.word.adjective();

        //const editArticle = new ArticleEdit(page);
        const locator2 = webApp.articleEdit.getArticlePreview(article.title);
        await expect(locator2).toHaveText(article.title);
        await webApp.articleEdit.editCreatedArticle(article);
    });
});
