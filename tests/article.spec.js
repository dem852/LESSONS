import { test, expect } from '@playwright/test';

import { UserBuilder } from '../src/helpers/user.builders';
import { ArticleBuilder } from '../src/helpers/article.builders';
import { App } from '../src/pages/app.page'
import { visioArticle } from '../src/pages/myPage'
import { Comments } from '../src/pages/myPage'
import { oneLike } from '../src/pages/myPage'
import { buttonGlobal } from '../src/pages/myPage'
import { filterTag } from '../src/pages/myPage'


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
    const visibleItem = new visioArticle(page);
    await expect(visibleItem.visualButton()).toBeVisible();
    const usercomment = new Comments(page);
    await expect(usercomment.visualcommentButton()).toBeVisible();

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
    const visualLike = new oneLike(page);
    await expect(visualLike.visualtabLike()).toBeVisible();
    const tab = new buttonGlobal(page);
    await expect(tab.visualtabButton()).toBeVisible();
    
})

test('Фильтрация статей по популярному тэгу', async ({page}) => {
    let app = new App(page);
    
    await app.main.open();
    await app.main.popularTagButtonClick();
    const nameTag = new filterTag(page);
    await expect(nameTag.visualButton()).toBeVisible();
    
})