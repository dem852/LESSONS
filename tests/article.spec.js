﻿    import { test, expect } from '@playwright/test';
//import { MainPage, RegisterPage, YourFeedPage, GlobalFeedPage } from '../src/pages/index';
import { UserBuilder } from '../src/helpers/user.builders';
import { ArticleBuilder } from '../src/helpers/article.builders';
import { App } from '../src/pages/app.page'



test('Создание статьи авторизованным пользователем', async ({page}) => {

    const randomUser = new UserBuilder()
        .addEmail()
		.addPassword()
		.addUsername()
		.generate();

	let app = new App(page);
    await app.main.open();
    await app.main.gotoSignUp();
    await app.register.signUp(randomUser);
    await expect(app.yourFeed.profileNameField).toContainText(randomUser.username);

    const randomArticle = new ArticleBuilder()
    .generateArticleTitle()
    .generateArticleInfo()
    .generateArticleContent()
    .generateArticleTag()
    .generate();

    await app.newArticle.open();
    await app.newArticle.newArticle(randomArticle);
    await expect(page.getByRole('button', { name: ' Edit Article' }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'Post Comment' }).first()).toBeVisible();
})


test('Проставить лайк статье из раздела Global Feed', async ({page}) => {
    const randomUser = new UserBuilder()
        .addEmail()
        .addPassword()
        .addUsername()
        .generate();

    let app = new App(page);
    await app.main.open();
    await app.main.gotoSignUp();
    await app.register.signUp(randomUser);
    await expect(app.yourFeed.profileNameField).toContainText(randomUser.username);

    const randomArticle = new ArticleBuilder()
    .generateArticleTitle()
    .generateArticleInfo()
    .generateArticleContent()
    .generateArticleTag()
    .generate();

    await app.newArticle.open();
    await app.newArticle.newArticle(randomArticle);
    await app.main.open();
    await app.globalFeed.open();
    await app.globalFeed.likePost();
    await expect(page.getByRole('button', { name: '( 1 )' })).toBeVisible();
    await expect(page.getByRole('button', { name: '  Global Feed' }).first()).toBeVisible();
})

test('Фильтрация статей по популярному тэгу', async ({page}) => {
    let app = new App(page);
    
    await app.main.open();
    await app.main.popularTagButtonClick();
    await expect(page.getByRole('button', { name: 'clamo' }).first()).toBeVisible();
})