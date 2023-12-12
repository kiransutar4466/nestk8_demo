import { mount } from 'cypress/react'
import Login from './index.js';

describe('Login Component', () => {
  it('should log in successfully with valid credentials', () => {
    mount(<Login />)
    cy.get('#email').type('valid@email.com');
    cy.get('#password').type('validpassword');
    cy.get('.btn').click();
    cy.url().should('include', '/dashboard');
  });

  it('should display an error message with invalid credentials', () => {
    mount(<Login />);
    cy.get('#email').type('invalid@email.com');
    cy.get('#password').type('invalidpassword');
    cy.get('.btn').click();
    cy.contains('.toast-error', 'Failed to login').should('exist');
  });
});
