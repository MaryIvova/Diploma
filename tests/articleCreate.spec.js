import { faker } from '@faker-js/faker';
import { expect } from '@playwright/test';
import { ArticleBuilder } from '../src/builders';
import { LogInPage, ArticleCreation, MyArticlesPage, ProfilePage } from '../src/pages';
import { test } from '../src/fixture_PO';

const URL = 'https://realworld.qa.guru';

test.describe('Логин', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
        const logInPage = new LogInPage(page);
        await logInPage.userLogIn();
    });

    test('New Article @PO', async ({ page }) => {
        const article = new ArticleBuilder()
            .addTitle()
            .addDescription()
            .addText()
            .addTags()
            .generate();

        const newArticle = new ArticleCreation(page);
        await newArticle.createArticle(article);
        expect(newArticle.articleTT).toBeVisible;
    });

    /* await webApp.articleCreate.createArticle(articleData);
        expect(webApp.articleCreate.articleTT).toBeVisible;*/

    test('Check My articles @PO', async ({ page }) => {
        const article = {
            title: faker.word.adjective(),
            description: faker.word.adjective(),
            text: faker.lorem.lines(3),
            tags: faker.word.adjective(),
        };
        const newArticle = new ArticleCreation(page);
        await newArticle.createArticle(article);

        const profile = new ProfilePage(page);
        await profile.pageProfileopen();

        const myArticlesPage = new MyArticlesPage(page);
        await myArticlesPage.checkCreatedArticle(article);
        const locator = myArticlesPage.getArticlePreview(article.title);
        await expect(locator).toHaveText(article.title);
    });
});
