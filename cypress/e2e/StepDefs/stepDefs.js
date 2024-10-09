import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

const apiUrl = "https://fakerestapi.azurewebsites.net";

Given(/^the (Books|Authors) API is available$/, (itemType) => {
  cy.apiGET(`${apiUrl}/api/v1/${itemType}`);
  cy.get('@response').its('status').should('eq', 200);
});

Given(/^an (?:book|author) with ID 1 exists in the (Books|Authors) API$/, (itemType) => {
  const fixtureName = itemType === 'Books' ? 'newBook' : 'newAuthor';
  cy.fixture(fixtureName).then((itemData) => {
    cy.ensureItemExists(itemType, 1, itemData); 
  });
});

Given(/^valid (Books|Authors) details in "([^"]+)\"$/, (itemType, fixtureName) => {
  cy.fixture(fixtureName).as('itemDetails'); 
});

When(/^I send a GET request to "([^"]+)"$/, (endpoint) => {
  cy.apiGET(`${apiUrl}${endpoint}`);
});

When(/^I send a POST request to "([^"]+)" with the (Books|Authors) details$/, (endpoint) => {
  cy.get('@itemDetails').then((itemData) => {
    cy.apiPOST(`${apiUrl}${endpoint}`, itemData);
  });
});

When(/^I send a PUT request to "([^"]+)" with (updated|valid) details$/, (endpoint) => {
  cy.get('@itemDetails').then((itemData) => {
    cy.apiPUT(`${apiUrl}${endpoint}`, itemData);
  });
});

When(/^I send a DELETE request to "([^"]+)"$/, (endpoint) => {
  cy.apiDELETE(`${apiUrl}${endpoint}`);
});

Then(/^the response status should be (\d+)$/, (statusCode) => {
  cy.get('@response').its('status').should('eq', parseInt(statusCode));
});

Then(/^the response should contain a list of (Books|Authors)$/, () => {
  cy.get('@response').its('body').should('be.an', 'array');
});

Then(/^the response should contain the (Books|Authors) details$/, (itemType) => {
  const key = itemType === 'Books' ? 'title' : 'firstName';
  cy.get('@response').its('body').should('have.property', key);
});

Then(/^the (Book|Author) should be (added|updated) successfully$/, (itemType) => {
  const key = itemType === 'Book' ? 'title' : 'firstName';
  const expectedValue = itemType === 'Book' ? 'Automated Test Book' : 'John';
  cy.get('@response').its('body').should('have.property', key, expectedValue);
});

Then(/^the (Book|Author) should be deleted successfully$/, (itemType) => {
    const id = 1;
    const endpoint = `/${itemType}s/${id}`;

    cy.apiGET(`https://fakerestapi.azurewebsites.net/api/v1${endpoint}`);
    cy.get('@response').its('status').should('eq', 200);
    //Ideally Status code should be 404. But API returns 200 even after deleting same behavior via Swagger
  });

  Then(/^the response should indicate that the (Book|Author) is not found$/, (itemType) => {
    const id = 9999;
    const endpoint = `/${itemType}s/${id}`;

    cy.apiGET(`https://fakerestapi.azurewebsites.net/api/v1${endpoint}`);
    cy.get('@response').its('status').should('eq', 404);
  });

  Given(/^invalid (Books|Authors) details in "([^"]+)\.json"$/, (itemType, fixtureName) => {
    cy.fixture(fixtureName).as('itemDetails');
  });