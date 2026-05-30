import { faker } from '@faker-js/faker';
import { expect } from '@playwright/test';
import { test } from '../src/fixture_PO/index';
import { ArticleBuilder } from '../src/builders';
import { App } from '../src/pages/appFacade';


test.describe('LogIn', () => {
  test.beforeEach(async ({ webApp }) => {
  await webApp.loginPage.userLogIn();
  });

  test('New Article @e2e', async ({ webApp }) => {
    const article = new ArticleBuilder().addTitle().addDescription().addText().addTags().generate();

    await webApp.articleCreate.createArticle(article);
    expect(webApp.articleCreate.articleTT).toBeVisible;
  });

  test('Check My articles @e2e', async ({ webApp }) => {
    const article = new ArticleBuilder().addTitle().addDescription().addText().addTags().generate();
    await webApp.articleCreate.createArticle(article);
    await webApp.profilePage.pageProfileopen();

    await webApp.myArticlesPage.checkCreatedArticle(article);
    const locator = webApp.myArticlesPage.getArticlePreview(article.title);
    await expect(locator).toContainText(article.title);
  });
});
