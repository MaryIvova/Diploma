import { expect } from '@playwright/test';
import { test } from '../src/fixture_PO/index';
import { LogInPage, SettingsPage } from '../src/pages';

test.describe('LogIn', () => {
  test.beforeEach(async ({ webApp }) => {
   await webApp.loginPage.userLogIn();
  });

  test('Edit Profile @e2e', async ({ webApp }) => {
    await webApp.settingPage.profileEdit();
    await expect(webApp.settingPage.page).toHaveURL(/#\/settings/);
  });
});
