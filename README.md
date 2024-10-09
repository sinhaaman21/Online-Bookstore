# Online-Bookstore
## A. Description
API Automation Testing Assessment Online Bookstore using **Cypress** test automation scripts with a CI/CD pipeline using **GitHub Actions**. The tests are automatically run on every push or pull request to the `main` branch, ensuring continuous integration and automated testing.

## B. Setup
### Clone the repository:
 `git clone https://github.com/sinhaaman21/Online-Bookstore.git`

### Navigate to root folder:
 `cd Online-Bookstore`

## C. Install dependencies:
`npm install`

## D. Running Tests
### 1. Run Cypress Tests and Generate Allure Results
`npx cypress run --browser electron --headed --env allure=true`

### 2. Serve Allure Report
`npx allure serve "cypress/results/allure"`

### 3. Open Cypress Test Runner
`npx cypress open`

## E. Test Framework Setup Description
### 1. Test Data
Test data (.json files with request body) are stored in 
`cypress/fixtures`

### 2. Step Definitions
Step definitions are located in 
`cypress/e2e/StepDefs/stepDefs.js`

### 3. Feature File
The feature file defining the test scenarios is located at 
`cypress/e2e/Feature/authors.feature`
`cypress/e2e/Feature/books.feature`

### 4. Custom commands
Cypress custom commands are added in 
`(cypress/support/commands.js)`
Custom commands contains method for GET/POST/PUT/DELETE. These are used in steDefs while making API requests.

### 5. Video
Execution video is stored in
`cypress\videos`

### 6. Allure results
Allure results are located in 
`cypress/results/allure`
To view the allure report execute the below command
`npx allure serve "cypress/results/allure"`

### 7. Dependencies
Dependencies required are mentioned in `package.json`.
To install all the dependencies execute `npm install` from the root folder

### 8. Cypress configrations
Cypress configrations are defined in `cypress.config.js`

### 9. Prerequisites
1. Node.js (>=v14)
2. npm 
3. Git

## F. CI/CD with GitHub Actions
### GitHub Actions Workflow
Tests are automatically run using GitHub Actions on every push or pull request to the main branch.
Whenever changes are pushed to main, the following happens:
#### 1. GitHub Actions installs the necessary dependencies.
#### 2. Cypress runs all the tests.
#### 3. Test results are visible in the GitHub Actions logs.

## G. Author
Aman Sinha
sinha.amansinha@gmail.com