import { test, expect } from '@playwright/test';
import { LogInPage, SettingsPage } from '../src/pages';


test.describe('Логин', () => {
    test.beforeEach(async ({ page }) => {
        const logInPage = new LogInPage(page);
        await logInPage.userLogIn();
    });

    test('Edit Profile @e2e', async ({ page }) => {
        const settingsPage = new SettingsPage(page);
        await settingsPage.profileEdit();
        await expect(settingsPage.page).toHaveURL(/#\/settings/);
    });
});
