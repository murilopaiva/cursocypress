/// <reference types="Cypress"/>


describe('Teste E2E - Realizando a compra de produtos com sucesso', () => {
    it('Fluxo da compra de produtos', () => {
        cy.visit("https://www.saucedemo.com/")
        cy.get('[data-test="username"]').type("standard_user")
        cy.get('[data-test="password"]').type("secret_sauce")
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="title"]').should("contain", "Products")

        // Ordenação de pridutos de menor para maior valor:
        cy.get('[data-test="product-sort-container"]').select('Price (low to high)')
        // Validação da ordenação desses produtos: 
        cy.get(':nth-child(1) > [data-test="inventory-item-description"]').should('contain','Sauce Labs Onesie')
        cy.get(':nth-child(2) > [data-test="inventory-item-description"]').should('contain','Sauce Labs Bike Light')
        cy.get(':nth-child(3) > [data-test="inventory-item-description"]').should('contain','Sauce Labs Bolt T-Shirt')

        //Adicionando produtos ao carrinho
        cy.contains('Sauce Labs Onesie').click()
        cy.get('.btn_primary').click()
        cy.get('[data-test="back-to-products"]').click()

        //Adicionando produtos ao carrinho
        cy.contains('Sauce Labs Bike Light').click()
        cy.get('.btn_primary').click()
        cy.get('[data-test="back-to-products"]').click()

        //Adicionando produtos ao carrinho
        cy.contains('Sauce Labs Bolt T-Shirt').click()
        cy.get('.btn_primary').click()
        cy.get('[data-test="back-to-products"]').click()

        //checagem da quantidade de produtos adicionados ao carrinho
        cy.get('.shopping_cart_link').should('have.text','3')
        //Check no carrinho:
        cy.get('.shopping_cart_link').click()
        cy.get(':nth-child(3) > .cart_item_label').should('contain', 'Sauce Labs Onesie')
        cy.get(':nth-child(4) > .cart_item_label').should('contain', 'Sauce Labs Bike Light')
        cy.get(':nth-child(5) > .cart_item_label').should('contain', 'Sauce Labs Bolt T-Shirt')

        //Checkout:
        cy.get('[data-test="checkout"]').click()
        cy.get('[data-test="firstName"]').type('cebolinha')
        cy.get('[data-test="lastName"]').type('cebola')
        cy.get('[data-test="postalCode"]').type('59290000')
        cy.get('[data-test="continue"]').click()
        //Verificando produtos no checkout
        cy.get(':nth-child(3) > .cart_item_label').should('contain', 'Sauce Labs Onesie')
        cy.get(':nth-child(4) > .cart_item_label').should('contain', 'Sauce Labs Bike Light')
        cy.get(':nth-child(5) > .cart_item_label').should('contain', 'Sauce Labs Bolt T-Shirt')

        //checagem no valor toral:
        cy.get('[data-test="total-label"]').should('have.text', 'Total: $36.69')

        cy.get('[data-test="finish"]').click()

        cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!')


    });
});