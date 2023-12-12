import { mount } from "cypress/react";
import DashBoard from './index.js';

describe('Dashboard Component', () => {
  beforeEach(() => {
    cy.intercept('GET', '/user', { fixture: 'userData.json' }).as('getUserData');
  });

  it('should render the table with user data', () => {
    mount(<DashBoard />);
    cy.wait('@getUserData');
    cy.get('.custom-table tbody tr').should('have.length.gt', 0);
  });

  it('should open and close the Add User modal', () => {
    mount(<DashBoard />);
    cy.get('.btnAddUser').click();
    cy.get('.modal h1').should('have.text', 'Add User Model');
    cy.get('.modal .close').click();
    cy.get('.modal').should('not.exist');
  });

  it('should open the View User modal', () => {
    mount(<DashBoard />);
    cy.get('.ellipsis-menu').first().click();
    cy.get('.options-popup button').contains('View').click();
    cy.get('.modal h1').should('have.text', 'View User Model');
  });

  it('should open the Edit User modal', () => {
    mount(<DashBoard />);
    cy.get('.ellipsis-menu').first().click();
    cy.get('.options-popup button').contains('Edit').click();
    cy.get('.modal h1').should('have.text', 'Update User Model');
  });

  it('should open and confirm the Delete User modal', () => {
    mount(<DashBoard />);
    cy.get('.ellipsis-menu').first().click();
    cy.get('.options-popup button').contains('Delete').click();
    cy.get('.modal h2').should('have.text', 'Are you sure you want to delete this user?');
    cy.get('.modal .btn3').contains('Yes').click();
    cy.contains('.toast-success', 'User deleted successfully').should('exist');
  });

  it('should handle user registration successfully', () => {
    mount(<DashBoard />);
    cy.get('.btnAddUser').click();

    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Doe');
    cy.get('#email').type('john.doe@example.com');
    cy.get('#phoneNumber').type('123456789');
    cy.get('#country').type('United States');

    cy.get('.submit-button').click();
    cy.contains('.toast-success', 'User added successfully').should('exist');
  });
});
