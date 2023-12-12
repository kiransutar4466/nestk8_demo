import Registration from './index.js';
import { mount } from "cypress/react";

describe('Registration Component', () => {
  it('should register user successfully', () => {
    mount(<Registration />);

    // Fill out the registration form
    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Doe');
    cy.get('#email').type('john.doe@example.com');
    cy.get('#phoneNumber').type('123456789');
    cy.get('#country').type('United States');

    // Submit the form
    cy.get('.submit-button').click();

    // Assert success message
    cy.contains('.toast-success', 'User registered successfully').should('exist');

    // Assert navigation to the login page
    cy.url().should('include', '/login');
  });

  it('should handle registration failure', () => {
    mount(<Registration />);

    // Simulate a registration failure
    cy.intercept('POST', '/user/register', {
      statusCode: 500,
      body: { message: 'Internal Server Error' },
    }).as('registrationRequest');

    // Fill out the registration form
    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Doe');
    cy.get('#email').type('john.doe@example.com');
    cy.get('#phoneNumber').type('123456789');
    cy.get('#country').type('United States');

    // Submit the form
    cy.get('.submit-button').click();

    // Wait for the registration request to complete
    cy.wait('@registrationRequest');

    // Assert error message
    cy.contains('.toast-error', 'Internal Server Error').should('exist');
  });
});
