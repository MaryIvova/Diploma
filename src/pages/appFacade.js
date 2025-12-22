import { ArticleEdit, ArticleCreation, BasePage, FavoritesPage, HomePage, LogInPage, MainPage, MyArticlesPage, ProfilePage, SettingsPage } from './index.js';

export class App {
    constructor(page) {
        this.page = page;
        this.base = new BasePage(page);
        this.articleEdit = new ArticleEdit(page);
        this.articleCreate = new ArticleCreation(page);
        this.favoritesPage = new FavoritesPage(page);
        this.homePage = new HomePage(page);
        this.mainPage = new MainPage(page);
        this.loginPage = new LogInPage(page);
        this.myArticlesPage = new MyArticlesPage(page);
        this.profilePage = new ProfilePage(page);
        this.settingPage = new SettingsPage(page);
    }
}