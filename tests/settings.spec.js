﻿import { test, expect } from '@playwright/test';

import { UserBuilder } from '../src/helpers/user.builders';
import { App } from '../src/pages/app.page'

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

    await app.navigation.clickProfileButton();
    await expect(page.getByRole('link', { name: ' Settings' })).toBeVisible();
    await app.navigation.clickSettingsButton();
    await app.yourSettings.changeUserName(randomUser);
    await expect(page.getByRole('navigation')).toContainText(randomUser.username);
    await app.yourSettings.clickupDateSettingsButton();
})