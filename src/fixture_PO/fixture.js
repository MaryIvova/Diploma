import { test as base } from '@playwright/test';
import { App } from '../pages/appFacade';
import {ArticleBuilder} from "../builders/articleBuilder";
//import { App } from '../src/pages/appFacade';
// { Helpers } from '../helpers_PO/helpers.js';

export const test = base.extend({
    webApp: async ({ page }, use) => {
        const app = new App(page);
        await use(app);
    },

});