// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('apiGET', (endpoint) => {
    cy.request({
      method: 'GET',
      url: endpoint,
      failOnStatusCode: false  
    }).as('response');
  });

  Cypress.Commands.add('apiPOST', (endpoint, body) => {
    cy.request({
      method: 'POST',
      url: endpoint,
      body: body,
      failOnStatusCode: false 
    }).as('response');
  });
  
Cypress.Commands.add('apiPUT', (endpoint, body) => {
    cy.request('PUT', endpoint, body).as('response');
  });
  
Cypress.Commands.add('apiDELETE', (endpoint) => {
    cy.request({
      method: 'DELETE',
      url: endpoint,
      failOnStatusCode: false,
    }).as('response');
  });

Cypress.Commands.add('ensureItemExists', (itemType, itemId, itemData) => {
    const apiUrl = "https://fakerestapi.azurewebsites.net/api/v1/Books";
    
    cy.request({
      method: 'GET',
      url: `${apiUrl}/${itemId}`,
      failOnStatusCode: false 
    }).then((response) => {
      if (response.status === 404) {
        cy.request('POST', apiUrl, { ...itemData, id: itemId }).as('createdItem');
      }
    });
  });
  