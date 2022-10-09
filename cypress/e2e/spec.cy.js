describe('Testing app!', () => {
	it('load', () => {
		cy.visit('http://localhost:3000');
	});

	it('Rendered all elements properly', () => {
		cy.get('button').should('exist');
		cy.get('input').should('exist');
		cy.get('img').should('exist');
		cy.get('li').should('exist');
	});
	it('Switch chart mode to multiple, than back to single', () => {
		cy.get('.Visibility-button').click();
		cy.get('.Charts > img').should('be.visible');
		cy.get('.Chart > img').should('not.be.visible');
		cy.get('.Visibility-button').click();
		cy.get('.Charts > img').should('not.be.visible');
		cy.get('.Chart > img').should('be.visible');
	});
	it('Check if searching works - checking if URL of the chart has changed', () => {
		cy.get('#code').click().type('USD');
		cy.get('.Search-button').click();
		cy.get('.Chart > img').should('have.attr', 'src').should('include', 'USD');
	});

	it('Check if app draws multiple charts', () => {
		cy.get('.Visibility-button').click();
		cy.get('.Charts > img').should('have.attr', 'src').should('include', 'USD');
		cy.get('.Charts > img').should('have.attr', 'src').should('include', 'EUR');
	});

	it('Check if searching with li elements works', () => {
		cy.get('.list > :nth-child(10)').click();
		cy.get('#code').should('have.value', 'CHF');
		cy.get('.Search-button').click();
		cy.get('.Charts > img').should('have.attr', 'src').should('include', 'USD');
		cy.get('.Charts > img').should('have.attr', 'src').should('include', 'EUR');
		cy.get('.Charts > img').should('have.attr', 'src').should('include', 'CHF');
	});
});
