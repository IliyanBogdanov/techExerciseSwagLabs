# techExerciseSwagLabs
Automated test cases for an online shop to test the core functionality of the site - https://qa-challenge.codesubmit.io/

# Getting Started
To run the tests locally, follow these steps:

- Clone this repository to your local machine.
- Install dependencies by running `npm install` in the project directory.
- Run the tests using the command: `npx playwright test --headed`
- Run the report generation command: `npx playwright show-report`
- Multiple tests are being executed in parallel - 4 workers

# Additional Information
- This project uses TypeScript for writing tests and Playwright Test framework for test execution.
- Test files are located in the `tests/ directory`
- `loginPageTests.spec.ts` - login tests
- `onlineStorePageTests.spec.ts` - online store tests
- Page elements and selectors are defined in the `loginPageElements.ts` file and `onlineStorePageElements.ts` 
- user credentials are stored in `user-credentials.json`
- all scenarios related with the provided users are covered

# Contributors
Iliyan Bogdanov - SDET
