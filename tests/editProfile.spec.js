import { test, expect } from '@playwright/test';
import { LogInPage, SettingsPage } from '../src/pages';

const URL = 'https://realworld.qa.guru';

test.describe('Логин', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(URL);
        const logInPage = new LogInPage(page);
        await logInPage.userLogIn();
    });

    test('Edit Profile @PO', async ({ page }) => {
        const settingsPage = new SettingsPage(page);
        await settingsPage.profileEdit();
        await expect(settingsPage.page).toHaveURL(/#\/settings/);
    });
});
