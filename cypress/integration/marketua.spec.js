describe('Marketua tests', function() {
    it('Marketua runs', function() {
        cy.visit('http://localhost:8100/login')
    })

    it('Login', function() {
        cy.visit('http://localhost:8100/login')
        cy.get('.center')
        .click()
    })

    it('Search', function() {
        cy.visit('http://localhost:8100/home')
        cy.get('[aria-labelledby="ion-input-0-lbl"]')
            .type('celular')
            .should('have.value', 'celular')
        cy.get('ion-col.md > .ion-color-primary')
            .click()
        cy.contains('Celular Huawei')
    })

    it('Category', function() {
        cy.visit('http://localhost:8100/home')
        cy.get('ion-col.md > :nth-child(3)')
            .click()
        cy.get('.popover-viewport > .list-md > :nth-child(1)')
            .click()
        cy.contains('Xiaomi Redmi')
    })

    it('Marca', function() {
        cy.visit('http://localhost:8100/home')
        cy.get('ion-col.md > :nth-child(4)')
            .click()
        cy.get('.popover-viewport > .list-md > :nth-child(1)')
            .click()
        cy.contains('Portatil Acer')
    })

    it('Detalle', function() {
        cy.visit('http://localhost:8100/home')
        cy.get('ion-col.md > .ion-color-primary')
            .click()
        cy.get(':nth-child(2) > .card')
            .click()
           
    })
    
    it('Agregar carrito desde buscar', function() {
        cy.visit('http://localhost:8100/home')
        cy.get('ion-col.md > .ion-color-primary')
            .click()
        cy.get(':nth-child(1) > .card > .content > .button')
            .click()
        
    })

    it('Ver carrito', function() {
        cy.visit('http://localhost:8100/home')
        cy.get('ion-col.md > .ion-color-primary')
            .click()
        cy.get(':nth-child(1) > .card > .content > .button')
            .click()
        cy.get('.footer-md > .ion-color')
            .click()
        cy.url().should('eq', 'http://localhost:8100/car')
        
    })
  
})