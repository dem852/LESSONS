import { test, expect } from '@playwright/test';
import { UserBuilder } from '../src/helpers/user.builders';
import { App } from '../src/pages/app.page'
import { visioSettings } from '../src/pages/myPage'


test('Смена имени пользователя', async ({ page }) => {

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

   
    await app.yourSettings.clickSettingsButton();

    const buttonSettings = new visioSettings(page);
    await expect(buttonSettings.visualButtonSettings()).toBeVisible();

   
    await app.yourSettings.changeUserName(randomUser);
    await expect(app.yourFeed.profileNameField).toContainText(randomUser.username);
   
})