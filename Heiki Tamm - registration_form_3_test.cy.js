

function inputValidData(email,name) {
    
    cy.get('#name').type(name)
    cy.get('.email').type(email)
 
} 

beforeEach(() => {
    

cy.visit('cypress/fixtures/registration_form_3.html')
})

    it('visual tests for registration form 3', () => {

    //Radio buttons and its content
    cy.get('input[type="radio"]').next().eq(0).should('have.text','Daily');
    cy.get('input[type="radio"]').next().eq(1).should('have.text','Weekly');
    cy.get('input[type="radio"]').next().eq(2).should('have.text','Monthly');
    cy.get('input[type="radio"]').next().eq(3).should('have.text','Never');

    // Select a country from the first dropdown
    cy.get('#country').select('Spain');

    // Verify the selected option in the first dropdown
    cy.get('#country').should('contain', 'Spain');

    // Select a city from the second dropdown
    cy.get('#city').select('Madrid');

    // Verify the selected option in the second dropdown
    cy.get('#city').should('contain', 'Madrid');
    
    // checkboxes, their content and links
    cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
    cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
    cy.get('.w3-container > [type="submit"]').click()
    cy.go('back')

    //email format-Insert wrong email
    cy.get('.email').type('invalid-email');

    // Verify that the error message is displayed
    cy.get('#emailAlert').should('be.visible')


})


    it('functional tests for registration form 3', () => {

    //All fields are filled + validation
    cy.get('#name').clear(); 
    cy.get('#name').type('Heiki123');
    cy.get('.email').type('Heiki@gmail.com');
    
    cy.get('#country').select('Spain');
    cy.get('#country').should('contain', 'Spain', 'Estonia', 'Austria');
   
    cy.get('#city').select('Madrid');
    cy.get('#city').should('contain', 'Malaga','Madrid', 'Valencia', 'Corralejo');

    cy.get(':nth-child(8) > input').type('2013-11-03');
    cy.get('#birthday').type('2013-11-03');

    cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo');
    cy.get('img').invoke('height').should('be.lessThan', 178).and('be.greaterThan', 165);

    cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
    cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
    cy.get('input[type=file]').selectFile('C:\\Users\\heiki\\OneDrive\\Desktop\\Heiki Tamm registration_form_1_test.cy.js');
    cy.get('.w3-container > [type="submit"]').click()
    // cy.go('back')


    })


    it('mandatory fields are absent + validations', () => {

    //Name and email are incorrect + validation. it seems like username accepts every character

    cy.get('#name').clear();
    inputValidData('thisiswrongemail', 'wro`hfhfhfhjuytyutng&¤#&/(¤na!!=)(/?m3');
        
    // Verify that the error message is displayed
    cy.get('#emailAlert').should('be.visible')

    //Here you can add date from future with no error.
    cy.get(':nth-child(8) > input').type('2943-11-03');
    cy.get('#birthday').type('4000-11-03');
        
    
    })

    it('if city is already chosen and country is updated, then city choice should be removed', () => {
    
    // Select a country 
    cy.get('#country').select('Spain');

    // Select a city 
    cy.get('#city').select('Madrid');

    // cy.get('#city').should('be.disabled'); //NOTE : I AM UNABLE TO SOLVE THIS. I HAVE NO IDEA HOW TO DISABLE IT.
    //I REALLY WANT TO KNOW/SEE HOW TO DO IT. :)

    cy.get('h1').contains('Registration page').click()

    })


    it('add file', () => {

    // Adding a file and just clicking checkboxes for confirmation
    
    cy.get('input[type=file]').selectFile('C:\\Users\\heiki\\OneDrive\\Desktop\\Heiki Tamm registration_form_1_test.cy.js');
    cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
    cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
    
    //Last two functions are disabled, otherwise you can not see the uploaded file.
    // cy.get('.w3-container > [type="submit"]').click()  
    // cy.go('back')


    })



