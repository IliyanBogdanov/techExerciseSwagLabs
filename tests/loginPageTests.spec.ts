// test.spec.ts
import { expect, test } from '@playwright/test';
import * as userCredentials from '../user-credentials.json';
import { USERNAME_FIELD_SELECTOR, PASSWORD_FIELD_SELECTOR, LOGIN_BUTTON_SELECTOR } from './loginPageElements';

// Define test suite
test.describe('Swag Labs QA Automation Test Suite', () => {
    
    // Define test case
    test('Successful login', async ({ page }) => {

        // Navigate to Swag Labs homepage
        await page.goto('https://qa-challenge.codesubmit.io/');

        // Access the first user object from the users array
        const firstUser = userCredentials.users[0];

        // Extract username and password from the first user object
        const { username, password } = firstUser;

        // Fill username and password fields
        await page.fill(USERNAME_FIELD_SELECTOR, username);
        await page.fill(PASSWORD_FIELD_SELECTOR, password);

        // Click on the login button
        await page.click(LOGIN_BUTTON_SELECTOR);

        // Wait for the dashboard to load
        await page.waitForSelector('.inventory_list');

        // Assert that the inventory list is visible
        const inventoryList = await page.isVisible('.inventory_list');
        expect(inventoryList).toBeTruthy();

    });
});
