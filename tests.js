const { chromium } = require('playwright');

(async () => {
  // Launch the browser
  const browser = await chromium.launch();

  // Create a new browser context
  const context = await browser.newContext();

  // Create a new page within the context
  const page = await context.newPage();

//   // Navigate to a webpage
//   await page.goto('https://qa-challenge.codesubmit.io/');

//   // Perform actions
//   await page.click('input[name="q"]');
//   await page.type('input[name="q"]', 'Playwright');
//   await page.press('input[name="q"]', 'Enter');

//   // Wait for the search results
//   await page.waitForSelector('#search');

//   // Assert some expectations
//   const searchResults = await page.$('#search');
//   const title = await page.title();
//   console.log(`Title of the page: ${title}`);

  // Close the browser
  await browser.close();
})();
