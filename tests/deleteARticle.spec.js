import { faker } from '@faker-js/faker';
import { test, expect } from '@playwright/test';
import { ArticleBuilder } from '../src/builders';
import {
    ArticleCreation,
    MyArticlesPage,
    ArticleEdit,
    LogInPage,
    ProfilePage,
} from '../src/pages';

test.describe('Логин', () => {
    test.beforeEach(async ({ page }) => {
        const logInPage = new LogInPage(page);
        await logInPage.userLogIn();
    });

    test('Delete My articles @e2e', async ({ page }) => {
        const article = new ArticleBuilder()
            .addTitle()
            .addDescription()
            .addText()
            .addTags()
            .generate();


        const newArticle = new ArticleCreation(page);
        await newArticle.createArticle(article);

        const profile = new ProfilePage(page);
        await profile.pageProfileopen();

        const myArticlesPage = new MyArticlesPage(page);
        await myArticlesPage.checkCreatedArticle(article);
        const locator = myArticlesPage.getArticlePreview(article.title);
        await expect(locator).toHaveText(article.title);

        const editArticle = new ArticleEdit(page);
        await editArticle.deleteArticle(article);

        const deletedArticle = new MyArticlesPage(page);
        const locator2 = myArticlesPage.getArticlePreview(article.title);
        await expect(locator2).toHaveText(article.title);
        await deletedArticle.checkDeletedArticle(article);
        await expect(locator2).toBeHidden();
    });
});
