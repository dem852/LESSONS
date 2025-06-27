import { test, expect } from '@playwright/test';
import { UserBuilder } from '../src/helpers/user.builders';
import { App } from '../src/pages/app.page'
import { visioLogout } from '../src/pages/myPage'
import { visioLogin } from '../src/pages/myPage'
import { visioSignUp } from '../src/pages/myPage'


test('Выход из учетной записи юзера', async ({ page }) => {
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


    await app.navigation.clickProfileButton();
    const buttonLogout = new visioLogout(page);
    await expect(buttonLogout.visualButtonLogout()).toBeVisible();

    await app.navigation.clickProfileButton();
    await app.navigation.clickLogoutButton();

    const buttonLogin = new visioLogin(page);
    await expect(buttonLogin.visualButtonLogin()).toBeVisible();

    const buttonSignUp = new visioSignUp(page);
    await expect(buttonSignUp.visualButtonSignUp()).toBeVisible();
})   