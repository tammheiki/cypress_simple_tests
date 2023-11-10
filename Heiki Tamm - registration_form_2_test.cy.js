   
   
        beforeEach(() => {
        cy.visit('cypress/fixtures/registration_form_2.html')
})


        import { faker } from '@faker-js/faker';
        const username = faker.internet.userName();
        const email = faker.internet.email();
        const password = faker.internet.password();
    
    
        describe('Section 1: Functional tests', () => {  
        it('User can use only same both first and validation passwords', ()=>{

        // Add test steps for filling in only mandatory fields
        cy.get('#username').type(username);
        cy.get('#email').type(email);
        cy.get('input[placeholder="John"]').type('John');
        cy.get('input[placeholder="Smith"]').type('Smith');
        cy.get('[data-testid="phoneNumberTestId"]').type('123456789');

        // Type confirmation password which is different from first password
        cy.get('input[name="password"]').type('Password123');
        cy.get('[name="confirm"]').type(password);

        // Assert that submit button is not enabled
        cy.get('h2').contains('Password').click();
        cy.get('.submit_button').should('be.disabled');

        // Assert that successful message is not visible
        cy.get('#success_message').should('not.be.visible');

        // Assert that error message is visible
        cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!');
       
    })


        // all fields on the page are filled in 
        it('User can submit form with all fields added', ()=>{

        cy.get('#username').type(username);
        cy.get('#email').type(email);
        cy.get('input[placeholder="John"]').type('John');
        cy.get('input[placeholder="Smith"]').type('Smith');
        cy.get('[data-testid="phoneNumberTestId"]').type('123456789');
        cy.get('h2:contains("Please select your favorite Web language:")').click(); 
        cy.contains('JavaScript').click();
        cy.contains('label', 'I have a boat').click();
        cy.get('input[id="vehicle3"]').check();
        cy.get('#cars').select('Saab');
        cy.get('#animal').select('Hippo');
        cy.get('input[name="password"]').type('Password123');
        cy.get('[name="confirm"]').type('Password123');

        // Assert that submit button is enabled
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled');
        cy.get('.submit_button').click();

        // Assert that after submitting the form system show successful message
        cy.get('#success_message').should('be.visible');
       
    })


        it('User can submit form with valid data and only mandatory fields added', ()=>{

        // Add test steps for filling in ONLY mandatory fields
        cy.get('#username').type(username);
        cy.get('#email').type(email);
        cy.get('input[placeholder="John"]').type('John');
        cy.get('input[placeholder="Smith"]').type('Smith');
        cy.get('[data-testid="phoneNumberTestId"]').type('123456789');
        cy.get('input[name="password"]').type('Password123');
        cy.get('[name="confirm"]').type('Password123');

        // Assert that submit button is not enabled
        cy.get('h2:contains("Your favourite transport")').click();
        cy.get('.submit_button').should('not.be.disabled');
        cy.get('.submit_button').click();

        // Assert that after submitting the form system shows successful message
        cy.get('#success_message').should('be.visible');
       
    })


        
        it("Submit button is not enabled, when a mandatory field is not present", () =>{

        // Add test steps for filling all mandatory fields except one(missing password)
        cy.get('#username').type(username);
        cy.get('#email').type(email);
        cy.get('input[placeholder="John"]').type('John');
        cy.get('input[placeholder="Smith"]').type('Smith');
        cy.get('[data-testid="phoneNumberTestId"]').type('123456789');
        
        cy.get('[name="confirm"]').type('Password123');
        cy.get('[data-testid="phoneNumberTestId"]').type(1122334455);

        // Assert that submit button is not enabled
        cy.get('h2:contains("Your favourite transport")').click();
        cy.get('.submit_button').should('be.disabled')
       
        //  Assert that successful message is not visible
         cy.get('#success_message').should('not.be.visible')

        //  Assert that error message is visible
         cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!');

    })

    })

        //Veify the correctness of logo
        describe('Section 2: Visual tests', () => {
        it('Check that logo is correct and has correct size', () => {

        cy.log('Will check logo source and size');
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo');
        cy.get('img').invoke('height').should('be.lessThan', 178).and('be.greaterThan', 100);

    })
        //Second picture on the right
        it('Test for second picture', () => {

        cy.log('Will check the second logo source and size');
        cy.get('img[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo.png');
        cy.get('img[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 90).and('be.greaterThan', 87);
          
    });

        //check the link in the navigation bar
        it('Check navigation part to registration form 1', () => {

        cy.get('nav').children().should('have.length', 2);
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2');
        cy.get('nav').children().eq(0).should('be.visible').and('have.attr', 'href', 'registration_form_1.html').click();
        cy.url().should('contain', '/registration_form_1.html');
        cy.go('back')
        cy.log('Back again in registration form 2');
    })


        //check the second link in the navigation bar
        it('Check navigation part for registration page 3', () => {

        cy.get('nav').children().should('have.length', 2);
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2');
        cy.get('nav').children().eq(1).should('be.visible').and('have.attr', 'href', 'registration_form_3.html').click();
        cy.url().should('contain', '/registration_form_3.html');
        cy.go('back')
        cy.log('Back again in registration form 3');
        
    })

    
        //Check that the list of radio buttons are correct
        it('Check that radio button list is correct', () => {
        
        cy.get('input[type="radio"]').should('have.length', 4);
        cy.get(':nth-child(9) > :nth-child(1)').click();
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML');
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS');
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript');
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP');
        cy.get('input[type="radio"]').eq(0).should('not.be.checked');
        cy.get('input[type="radio"]').eq(1).should('not.be.checked');
        cy.get('input[type="radio"]').eq(2).should('not.be.checked');
        cy.get('input[type="radio"]').eq(3).should('not.be.checked');
        cy.get('input[type="radio"]').eq(0).check().should('be.checked');
        cy.get('input[type="radio"]').eq(1).check().should('be.checked');
        cy.get('input[type="radio"]').eq(0).should('not.be.checked');
    })



        //Check that the list of checkboxes are correct
        it('Check that the checkboxes are correct', () => {

        cy.get('input[type="radio"]').should('have.length', 4);
        cy.get(':nth-child(9) > :nth-child(1)').click();
        cy.get('input[type=checkbox]').next().eq(0).should('have.text','I have a bike');
        cy.get('input[type=checkbox]').next().eq(1).should('have.text','I have a car');
        cy.get('input[type=checkbox]').next().eq(2).should('have.text','I have a boat');
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked');
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked');
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked');
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked');
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked');
        cy.get('input[type="checkbox"]').eq(0,1).should('be.checked');
    })

        //Check that the car dropdown is correct
        it('Car dropdown is correct', () => {

        cy.get('#cars').select(1).screenshot('Cars drop-down');
        cy.screenshot('Full page screenshot');
        cy.get('#cars').select(3);
        cy.get('#cars').children().should('have.length', 4);
        cy.get('#cars').find('option').should('have.length', 4);
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo');
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi']);
        })
    })

        //Check that the animal dropdown is correct
        it('Animal dropdown is correct', () => {

        cy.get('#animal').select(4)
        cy.get('#animal').children().should('have.length', 6);
        cy.get('#animal').find('option').should('have.length', 6);
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog');
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value);
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'cow', 'mouse',]);
        })
    })

})


