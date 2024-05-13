import { expect, test } from '@playwright/test';
import * as userCredentials from '../../user-credentials.json';
import { 
    USERNAME_FIELD_SELECTOR, 
    PASSWORD_FIELD_SELECTOR, 
    LOGIN_BUTTON_SELECTOR, 
    INVENTORY_LIST 
} from '../loginPage/loginPageElements';
import { 
    ADD_TO_CART_BUTTON_SELECTOR, 
    CHECKOUT_BUTTON_SELECTOR, 
    CONTINUE_BUTTON_SELECTOR, 
    FINISH_BUTTON_SELECTOR, 
    FIRST_NAME_INPUT_SELECTOR, 
    LAST_NAME_INPUT_SELECTOR, 
    POSTAL_CODE_INPUT_SELECTOR, 
    REPETATIVE_IMAGE_SELECTOR, 
    SHOPPING_CART_ICON_SELECTOR, 
    SUCCESSFUL_ORDER_MESSAGE_SELECTOR 
} from './onlineStorePageElements';

test.describe('Online Store Page Tests', () => {

    // This test case is expected to be failing until product photo repetition issue is resolved
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

    // This test case is expected to be failing until login performance issue is resolved
    test('Login performance test - users[3]', async ({ page }) => {

        await page.goto('https://qa-challenge.codesubmit.io/');

        const firstUser = userCredentials.users[3];
        const { username, password } = firstUser;

        await page.fill(USERNAME_FIELD_SELECTOR, username);
        await page.fill(PASSWORD_FIELD_SELECTOR, password);

        // Wrap click on the login button in a Promise.race with a 1 second timeout
        const loginButtonPromise = page.click(LOGIN_BUTTON_SELECTOR);
        const loginButtonTimeoutPromise = new Promise<void>((resolve, reject) => {
            setTimeout(() => reject(new Error('Login button click did not complete within 1 second')), 1000);
        });

        try {
            // Wait for login button click or timeout
            await Promise.race([loginButtonPromise, loginButtonTimeoutPromise]);
        } catch (error) {
            // If login button click doesn't complete within 1 second, the test will fail
            throw error;
        }

        // Wait for the inventory_list to appear, but timeout after 1 second
        const inventoryList = await page.waitForSelector(INVENTORY_LIST, { timeout: 1000 }).catch(() => {
            // If inventory_list doesn't appear within 1 second, the test will fail
            throw new Error('inventory_list did not appear within 1 second');
        });

        // Assert that the inventory_list is not null (i.e., it appeared within 1 second)
        expect(inventoryList).not.toBeNull();

    });

    test('Successful order - users[0]', async ({ page }) => {

        await page.goto('https://qa-challenge.codesubmit.io/');

        const firstUser = userCredentials.users[0];
        const { username, password } = firstUser;

        await page.fill(USERNAME_FIELD_SELECTOR, username);
        await page.fill(PASSWORD_FIELD_SELECTOR, password);
        await page.click(LOGIN_BUTTON_SELECTOR);

        await page.waitForSelector(INVENTORY_LIST);

        await page.click(ADD_TO_CART_BUTTON_SELECTOR);
        await page.click(SHOPPING_CART_ICON_SELECTOR);
        await page.click(CHECKOUT_BUTTON_SELECTOR);

        await page.fill(FIRST_NAME_INPUT_SELECTOR, 'Iliyan');
        await page.fill(LAST_NAME_INPUT_SELECTOR, 'Bogdanov');
        await page.fill(POSTAL_CODE_INPUT_SELECTOR, '4400');
        
        await page.click(CONTINUE_BUTTON_SELECTOR);
        await page.click(FINISH_BUTTON_SELECTOR);

        const actualSuccessfulOrderMessage = await page.innerText(SUCCESSFUL_ORDER_MESSAGE_SELECTOR);
        const expectedSuccessfulOrderMessage = 'Your order has been dispatched, and will arrive just as fast as the pony can get there!';

        expect(actualSuccessfulOrderMessage).toBe(expectedSuccessfulOrderMessage);
    });
});
