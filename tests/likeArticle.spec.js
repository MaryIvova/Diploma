import { test, expect } from '@playwright/test';
import { LogInPage, HomePage, FavoritesPage, ProfilePage } from '../src/pages';

const articleTitle = 'Здесь могла бы быть ваша реклама';

test.describe('Логин', () => {
    test.beforeEach(async ({ page }) => {
        const logInPage = new LogInPage(page);
        await logInPage.userLogIn();
    });

    test.only('Like article from tags @e2e', async ({ page }) => {
        const homePage = new HomePage(page);
        await homePage.openTag('реклама');
        await expect(homePage.pagination).toBeVisible();
        await  homePage.selectPagination();
        await homePage.likeArticle(articleTitle);
        await expect(homePage.likeButton(articleTitle)).toHaveClass(/active/);

        const profile = new ProfilePage(page);
        await profile.pageProfileopen();

        const favorites = new FavoritesPage(page);
        await favorites.checkFavorites(articleTitle);
        await expect(favorites.article(articleTitle)).toBeVisible();
        await expect(favorites.likeButton(articleTitle)).toHaveClass(/active/);
    });

    test.afterEach('unlike article', async ({ page }) => {
        const notFavorites = new FavoritesPage(page);
        await notFavorites.unLikeArticle(articleTitle);
        await expect(notFavorites.likeButton(articleTitle)).not.toHaveClass(/active/);
    });
});
