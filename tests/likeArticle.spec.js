//import { test, expect } from '@playwright/test';
import { test, expect } from '../src/fixture_PO/index';
import { App } from '../src/pages/appFacade';
import { LogInPage, HomePage, FavoritesPage, ProfilePage } from '../src/pages';

const articleTitle = 'Здесь могла бы быть ваша реклама';

test.describe('Article: Like/Unlike', () => {
  test.beforeEach(async ({ webApp }) => {
    await webApp.loginPage.userLogIn();
  });

  test.only('Like article from tags @e2e', async ({ webApp }) => {
    //const homePage = new HomePage(page);
    await webApp.homePage.openTag('реклама');
    await expect(webApp.homePage.pagination).toBeVisible();
    await webApp.homePage.selectPagination();
    await webApp.homePage.likeArticle(articleTitle);
    await expect(webApp.homePage.likeButton(articleTitle)).toHaveClass(/active/);

    //const profile = new ProfilePage(page);
    await webApp.profilePage.pageProfileopen();

    //const favorites = new FavoritesPage(page);
    await webApp.favoritesPage.checkFavorites(articleTitle);
    await expect(webApp.favoritesPage.article(articleTitle)).toBeVisible();
    await expect(webApp.favoritesPage.likeButton(articleTitle)).toHaveClass(/active/);
  });

  test.afterEach('unlike article', async ({ webApp }) => {
    //const notFavorites = new FavoritesPage(page);
    await webApp.favoritesPage.unLikeArticle(articleTitle);
    await expect(webApp.favoritesPage.likeButton(articleTitle)).not.toHaveClass(/active/);
  });
});
