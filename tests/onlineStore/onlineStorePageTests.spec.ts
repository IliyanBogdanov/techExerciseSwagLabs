import { expect, test } from '@playwright/test';
import * as userCredentials from '../../user-credentials.json';
import { USERNAME_FIELD_SELECTOR, PASSWORD_FIELD_SELECTOR, LOGIN_BUTTON_SELECTOR, INVENTORY_LIST } from '../loginPage/loginPageElements';
import { REPETATIVE_IMAGE_SELECTOR } from './onlineStorePageElements';

test.describe('Online Store Page Tests', () => {

    //This test case is expected to be failing until product photo repetition issue is resolved
    test('Product photos are not the same - users[2]', async ({ page }) => {

        await page.goto('https://qa-challenge.codesubmit.io/');

        const firstUser = userCredentials.users[2];
        const { username, password } = firstUser;

        await page.fill(USERNAME_FIELD_SELECTOR, username);
        await page.fill(PASSWORD_FIELD_SELECTOR, password);
        await page.click(LOGIN_BUTTON_SELECTOR);

        await page.waitForSelector(INVENTORY_LIST);

        // Get all elements matching the selector
        const elements = await page.$$(REPETATIVE_IMAGE_SELECTOR);

        // Assert that only one element is found
        expect(elements.length).toBe(1);

    });
});
