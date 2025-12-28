import {expect, test} from '@playwright/test';

export class ProfilePage {
    constructor(page) {
        this.page = page;
        this.userButton = page.locator('.nav-link.dropdown-toggle');
        this.dropDownMenu = page.locator('.dropdown-menu:visible');
        this.buttonProfile = page.locator('a.dropdown-item:has-text("Profile")');
    }

    async pageProfileopen() {
        return test.step(`open profile page  `, async (step) => {
            await this.userButton.click();
            await this.buttonProfile.click();
        });
    }
}
