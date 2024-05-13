// test.spec.ts
import { expect, test } from '@playwright/test';
import * as userCredentials from '../user-credentials.json';
import { USERNAME_FIELD_SELECTOR, PASSWORD_FIELD_SELECTOR, LOGIN_BUTTON_SELECTOR, INVENTORY_LIST, VALIDATION_MESSAGE_ERROR } from './loginPageElements';

test.describe('Swag Labs QA Automation Test Suite', () => {

    test('Successful login - users[0]', async ({ page }) => {

        await page.goto('https://qa-challenge.codesubmit.io/');

        const firstUser = userCredentials.users[0];
        const { username, password } = firstUser;

        await page.fill(USERNAME_FIELD_SELECTOR, username);
        await page.fill(PASSWORD_FIELD_SELECTOR, password);
        await page.click(LOGIN_BUTTON_SELECTOR);

        await page.waitForSelector(INVENTORY_LIST);

        const inventoryList = await page.isVisible(INVENTORY_LIST);
        expect(inventoryList).toBeTruthy();

    });

    test('Unsuccessful login - users[1]', async ({ page }) => {

        await page.goto('https://qa-challenge.codesubmit.io/');

        const firstUser = userCredentials.users[1];
        const { username, password } = firstUser;

        await page.fill(USERNAME_FIELD_SELECTOR, username);
        await page.fill(PASSWORD_FIELD_SELECTOR, password);
        await page.click(LOGIN_BUTTON_SELECTOR);

        const actualValidationMessage = await page.innerText(VALIDATION_MESSAGE_ERROR);
        const expectedValidationMessage = 'Epic sadface: Sorry, this user has been locked out.';

        expect(actualValidationMessage).toBe(expectedValidationMessage);
    });
});
