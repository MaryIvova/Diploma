import { faker } from '@faker-js/faker';
import { expect } from '@playwright/test';
import { test } from '../src/fixture_PO/index';
import { ArticleBuilder } from '../src/builders';
import { App } from '../src/pages/appFacade';
import { LogInPage, ArticleCreation, MyArticlesPage, ProfilePage } from '../src/pages/index';


const URL = 'https://realworld.qa.guru';

test.describe('Логин', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
        const logInPage = new LogInPage(page);
        await logInPage.userLogIn();
    });

    test('New Article @PO', async ({ webApp }) => {
        const article = new ArticleBuilder()
            .addTitle()
            .addDescription()
            .addText()
            .addTags()
            .generate();

       // let app = new App(page);
        await webApp.articleCreate.createArticle(article);
        expect(webApp.articleCreate.articleTT).toBeVisible;
    });


    test('Check My articles @PO', async ({ webApp }) => {
        const article = {
            title: faker.word.adjective(),
            description: faker.word.adjective(),
            text: faker.lorem.lines(3),
            tags: faker.word.adjective(),
        };
        //const newArticle = new ArticleCreation(page);
        await webApp.articleCreate.createArticle(article);

        //const profile = new ProfilePage(page);
        await webApp.profilePage.pageProfileopen();

        //const myArticlesPage = new MyArticlesPage(page);
        await webApp.myArticlesPage.checkCreatedArticle(article);
        const locator = webApp.myArticlesPage.getArticlePreview(article.title);
        await expect(locator).toHaveText(article.title);
    });
});
