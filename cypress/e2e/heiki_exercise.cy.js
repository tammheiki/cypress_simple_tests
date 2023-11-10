beforeEach(() => {
    cy.visit('https://demo.nopcommerce.com/')

   
})
import { faker } from '@faker-js/faker';
const randomEmail = faker.internet.email();
const password = faker.internet.email();
describe('Registration functionality', () => {
    
    it.only('Register new user', () => {
        cy.get('.menu-toggle').click()
        cy.get('.mobile > :nth-child(1) > a').click()
        cy.get('#customerCurrency').select("Euro")
        cy.get('.ico-register').click()
        cy.get('[for="gender"]')
        cy.get('.male').click()
        cy.get('#FirstName').type("TestingNewThings")
        cy.get('#LastName').type("NewThingsTesting")
        cy.get('[name="DateOfBirthDay"]').select("9")
        cy.get('[name="DateOfBirthMonth"]').select("December")
        cy.get('[name="DateOfBirthYear"]').select("1990")
        cy.get('[name=Email]').type(randomEmail)
        cy.get('#Company').type("Testing New Things")
        cy.get('#Newsletter').should('be.checked');
        cy.get('#Password').type(password)
        cy.get('#ConfirmPassword').type(password)
        cy.get('#register-button').click()
       
      

         });

})  



        
      
     


       













       


        
        
        
    
    


