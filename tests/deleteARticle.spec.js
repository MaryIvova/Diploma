import { faker } from '@faker-js/faker';
import { expect } from '@playwright/test';
import { test } from '../src/fixture_PO/index';
import { ArticleBuilder } from '../src/builders';
import { ArticleCreation, MyArticlesPage, ArticleEdit, LogInPage, ProfilePage } from '../src/pages';

test.describe('LogIn', () => {
  test.beforeEach(async ({ page }) => {
    const logInPage = new LogInPage(page);
    await logInPage.userLogIn();
  });

  test('Delete My articles @e2e', async ({ webApp }) => {
    const article = new ArticleBuilder().addTitle().addDescription().addText().addTags().generate();

    await webApp.articleCreate.createArticle(article);
    await webApp.profilePage.pageProfileopen();

    await webApp.myArticlesPage.checkCreatedArticle(article);
    const locator = webApp.myArticlesPage.getArticlePreview(article.title);
    await expect(locator).toHaveText(article.title);

    await webApp.articleEdit.deleteArticle(article);

    const locator2 = webApp.myArticlesPage.getArticlePreview(article.title);
    await expect(locator2).toHaveText(article.title);
    await webApp.myArticlesPage.checkDeletedArticle(article);
    await expect(locator2).toBeHidden();
  });
});
