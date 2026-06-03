//import { test, expect } from '@playwright/test';
import { test, expect } from '../src/fixture_PO/index';
import { App } from '../src/pages/appFacade';
import { LogInPage, HomePage, FavoritesPage, ProfilePage } from '../src/pages';

const articleTitle = 'Здесь могла бы быть ваша реклама';

test.describe('Article: Like/Unlike', () => {
  test.beforeEach(async ({ webApp }) => {
    await webApp.loginPage.userLogIn();
  });

  test('Like article from tags @e2e', async ({ webApp }) => {
    await webApp.homePage.openTag('реклама');
    await expect(webApp.homePage.pagination).toBeVisible();
    await webApp.homePage.selectPagination();
    await webApp.homePage.likeArticle(articleTitle);
    await expect(webApp.homePage.likeButton(articleTitle)).toHaveClass(/active/);

    await webApp.profilePage.pageProfileopen();

    await webApp.favoritesPage.checkFavorites(articleTitle);
    await expect(webApp.favoritesPage.article(articleTitle)).toBeVisible();
    await expect(webApp.favoritesPage.likeButton(articleTitle)).toHaveClass(/active/);
  });

  test.afterEach('unlike article', async ({ webApp }) => {
    await webApp.favoritesPage.unLikeArticle(articleTitle);
    await expect(webApp.favoritesPage.likeButton(articleTitle)).not.toHaveClass(/active/);
  });
});
