
beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_1.html')


})                    // 28.10.2023


    describe('This is first test suite, Heiki Tamm', () => {

    it('User can submit data with valid mandatory values', () => {

        cy.get('[data-testid="phoneNumberTestId"]').type('01234567890');
        cy.get('#username').type('SomethingToTestToday');
        cy.get('input[placeholder="John"]').type('John');
        cy.get('input[placeholder="Smith"]').type('Smith');
        cy.get('input[name="password"]').type('MyPassIsVeryStrong');
        cy.get('[name="confirm"]').type('MyPassIsVeryStrong');
        cy.get('h2').contains('Password').click();
        cy.get('.submit_button').should('be.enabled');
        cy.get('.submit_button').click();
        cy.get('#success_message').should('be.visible');
      
    });


    it('User can use only same both first and confirmation passwords', () => {

        cy.get('#username').type('John');
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777');
        cy.get('input[name="password"]').type('Password123');
        cy.get('[name="confirm"]').type('Password123123223453');
        cy.get('[name="confirm"]').type('{enter}');
        cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!');
        cy.get('#success_message').should('not.be.visible');
        cy.get('.submit_button').should('be.disabled');
         
    })


    it('User cannot submit data when username is absent', () => {

        
       
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040');
        cy.get("input[name='password']").type('Password123');
        cy.get('[name="confirm"]').type('Password123');
        cy.get('#username').scrollIntoView();
        cy.get('#username').clear(); 
        cy.get('.submit_button').should('be.disabled');
        cy.get('#success_message').should('not.be.visible');
        cy.get('#input_error_message').should('contain', 'Mandatory input field is not valid or empty!')
        
 
    })

   
    it('User cannot submit data when phone number is absent', () => {

        cy.get('#username').type('Heiki123');
        cy.get("input[name='password']").type('Password123');
        cy.get('[name="confirm"]').type('Password123');
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible');
       
        
      
        
    })


    it('User cannot submit data when password and/or confirmation password is absent', () => {

        cy.get('#username').type('Heiki123');
        cy.get('[data-testid="phoneNumberTestId"]').type('Cerebrum Hub');
        cy.get('.submit_button').should('be.disabled');
       
    })


    it('User cannot add letters to phone number', () => {
        
        cy.get('#username').type('Heiki123456');
        cy.get('[data-testid="phoneNumberTestId"]').type('Cerebrum Hub');
        cy.get("input[name='password']").type('Password123');
        cy.get('[name="confirm"]').type('Password123');
        cy.get('h2').contains('Password').click();
        cy.get('.submit_button').should('be.not.enabled');  
     
    })
})