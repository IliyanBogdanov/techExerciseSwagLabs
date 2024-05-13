# techExerciseSwagLabs
Automated test cases for an online shop to test the core functionality of the site - https://qa-challenge.codesubmit.io/

# Playwright Test Automation README
Introduction
This repository contains Playwright test scripts for automating tests on the Swag Labs website. 

# Getting Started
To run the tests locally, follow these steps:

- Clone this repository to your local machine.
- Install Node.js if you haven't already (https://nodejs.org/).
- Install dependencies by running npm install in the project directory.
- Run the tests using the command: `npx playwright test --headed`
- Run the report generation command: `npx playwright show-report`
- Multiple tests are being executed in parallel

- loginPageTests.spec.ts - login tests
- onlineStorePageTests.spec.ts - online store tests
- all scenarios related with the provided users are covered

# Additional Information
This project uses TypeScript for writing tests and Playwright Test framework for test execution.
Test files are located in the tests/ directory.
Page elements and selectors are defined in the loginPageElements.ts file and onlineStorePageElements.ts 

# Contributors
Iliyan Bogdanov - SDET
