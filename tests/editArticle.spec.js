import { faker } from '@faker-js/faker';
import { expect } from '@playwright/test';
import { test } from '../src/fixture_PO/index';
import { App } from '../src/pages/appFacade';
import { ArticleBuilder } from '../src/builders';

test.describe('Article: Edit', () => {
  test.beforeEach(async ({ webApp }) => {
    await webApp.loginPage.userLogIn();
  });

  test('Edit My articles @e2e', async ({ webApp }) => {
    const article = new ArticleBuilder().addTitle().addDescription().addText().addTags().generate();

    await webApp.articleCreate.createArticle(article);

    await webApp.myArticlesPage.checkCreatedArticle(article);

    const locator = webApp.myArticlesPage.getArticlePreview(article.title);
    await expect(locator).toBeVisible();

    article.description = faker.word.adjective();

    const locator2 = webApp.articleEdit.getArticlePreview(article.title);
    await expect(locator2).toHaveText(article.title);
    await webApp.articleEdit.editCreatedArticle(article);
  });
});
