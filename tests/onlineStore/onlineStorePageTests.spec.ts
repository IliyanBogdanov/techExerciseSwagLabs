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

test.describe('Online Store Tests', () => {

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

    // This test case is expected to be failing until the issue with this user's order is fixed
    test('Bug with user order is fixed - users[4]', async ({ page }) => {

        await page.goto('https://qa-challenge.codesubmit.io/');

        const firstUser = userCredentials.users[4];
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

        try {
            const actualSuccessfulOrderMessage = await Promise.race([
                page.innerText(SUCCESSFUL_ORDER_MESSAGE_SELECTOR),
                new Promise((resolve, reject) => setTimeout(() => reject(new Error('Timeout exceeded for successful order message')), 5000)) // Set timeout to 5 seconds
            ]);
            const expectedSuccessfulOrderMessage = 'Your order has been dispatched, and will arrive just as fast as the pony can get there!';

            expect(actualSuccessfulOrderMessage).toBe(expectedSuccessfulOrderMessage);
        } catch (error) {
            throw new Error('The bug with the user order is not fixed. The expected successful order message is not displayed.');
        }

    });

    // This test case is expected to be failing until the issue with the visual elements place is fixed
    test('Bug with visual elements is fixed - users[5]', async ({ page }) => {
        try {
            await page.goto('https://qa-challenge.codesubmit.io/');
    
            const firstUser = userCredentials.users[5];
            const { username, password } = firstUser;
    
            await page.fill(USERNAME_FIELD_SELECTOR, username);
            await page.fill(PASSWORD_FIELD_SELECTOR, password);
            await page.click(LOGIN_BUTTON_SELECTOR);
    
            await page.waitForSelector(INVENTORY_LIST);
    
            await page.click(ADD_TO_CART_BUTTON_SELECTOR);
    
            // Get the bounding box of the SHOPPING_CART_ICON_SELECTOR
            const shoppingCartIcon = await page.$(SHOPPING_CART_ICON_SELECTOR);
    
            // Guard clause to ensure shoppingCartIcon is not null
            if (!shoppingCartIcon) {
                throw new Error('Shopping cart icon not found.');
            }
    
            const shoppingCartBoundingBox = await shoppingCartIcon.boundingBox();
    
            // Assert that the SHOPPING_CART_ICON_SELECTOR exists
            expect(shoppingCartBoundingBox).not.toBeNull();
    
            // Specify the expected x and y coordinates for SHOPPING_CART_ICON_SELECTOR
            const expectedShoppingCartX = 40;
            const expectedShoppingCartY = 40;
    
            // Assert that the SHOPPING_CART_ICON_SELECTOR's position matches the expected x and y coordinates
            expect(shoppingCartBoundingBox?.x).toBe(expectedShoppingCartX);
            expect(shoppingCartBoundingBox?.y).toBe(expectedShoppingCartY);
    
            // Get the bounding box of the CHECKOUT_BUTTON_SELECTOR
            const checkoutButton = await page.$(CHECKOUT_BUTTON_SELECTOR);
    
            // Guard clause to ensure checkoutButton is not null
            if (!checkoutButton) {
                throw new Error('Checkout button not found.');
            }
    
            const checkoutButtonBoundingBox = await checkoutButton.boundingBox();
    
            // Assert that the CHECKOUT_BUTTON_SELECTOR exists
            expect(checkoutButtonBoundingBox).not.toBeNull();
    
            // Specify the expected x and y coordinates for CHECKOUT_BUTTON_SELECTOR
            const expectedCheckoutButtonX = 219.99;
            const expectedCheckoutButtonY = 33.45;
    
            // Assert that the CHECKOUT_BUTTON_SELECTOR's position matches the expected x and y coordinates
            expect(checkoutButtonBoundingBox?.x).toBe(expectedCheckoutButtonX);
            expect(checkoutButtonBoundingBox?.y).toBe(expectedCheckoutButtonY);
        } catch (error) {
            throw new Error('Bug with visual elements is not fixed');
        }
    });
    
    
});
