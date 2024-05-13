# techExerciseSwagLabs
Automated test cases for an online shop to test the core functionality of the site - https://qa-challenge.codesubmit.io/

# Playwright Test Automation README
Introduction
This repository contains Playwright test scripts for automating tests on the Swag Labs website. Playwright is a powerful tool for automating web browser interactions, and these tests demonstrate its usage in a real-world scenario.

# Getting Started
To run the tests locally, follow these steps:

# Clone this repository to your local machine.
# Install Node.js if you haven't already (https://nodejs.org/).
# Install dependencies by running npm install in the project directory.
# Run the tests using the command: `npx playwright test loginPageTests.spec.ts --headed`
# Run the report generation command: `npx playwright show-report`
# Multiple tests are being executed in parallel

# Test Suite

- Successful login
This test case navigates to the Swag Labs website, logs in using the credentials from the user-credentials.json file, and verifies that the inventory list is visible after successful login.

- 

# Additional Information
This project uses TypeScript for writing tests and Playwright Test framework for test execution.
Test files are located in the tests/ directory.
Page elements and selectors are defined in the loginPageElements.ts file.

# Contributors
Iliyan Bogdanov - Lead Developer


# Evaluation Criteria
- Automation & QA best practices
- Show us your work through your commit history
- We're looking for you to produce working code, with enough room to demonstrate how to structure
components in a small program
- Completeness: did you complete the features?
- Correctness: does the functionality act in sensible, thought-out ways?
- Maintainability: is it written in a clean, maintainable way?