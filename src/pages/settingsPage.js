import { expect } from '@playwright/test';

export class SettingsPage {
    constructor(page) {
        this.page = page;
        this.userButton = page.locator('.nav-link.dropdown-toggle');
        this.dropDownMenu = page.locator('.dropdown-menu:visible');
        this.settingsLink = page.locator('a.dropdown-item:has-text("Settings")');
    }

    async profileEdit() {
        await this.userButton.click();
        await this.settingsLink.click();
    }
}
