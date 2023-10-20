describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(() => {
        cy.visit('./src/index.html');
    });

    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 'É um texto bem longo que ficará escrito bem aqui. Ainda vou adicionar mais texto pra ele ficar mais longo ainda.';

        cy.get('#firstName').type('Rafael');
        cy.get('#lastName').type('Guerero');
        cy.get('#email').type('rafael@gmail.com');
        cy.get('#open-text-area').type(longText, { delay: 0 });
        cy.contains('button', 'Enviar').click();

        cy.get('.success').should('be.visible');
    });

    it('exibe mensagem de erro ao submeter o formulário com email inválido', () => {
        cy.get('#firstName').type('Rafael');
        cy.get('#lastName').type('Guerero');
        cy.get('#email').type('rafael');
        cy.get('#open-text-area').type('Texto');
        cy.contains('button', 'Enviar').click();

        cy.get('.error').should('be.visible');
    });

    it('campo telefone continua vazio quando preenchido com valor não numérico', () => {
        cy.get('#phone').type('abcdefghijk').should('have.value', '');

    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório e não é preenchido', () => {
        cy.get('#firstName').type('Rafael');
        cy.get('#lastName').type('Guerero');
        cy.get('#email').type('rafael@gmail.com');
        cy.get('#phone-checkbox').check();
        cy.get('#open-text-area').type('Texto');
        cy.contains('button', 'Enviar').click();

        cy.get('.error').should('be.visible');
    });

    it('preenche e limpa os campos, nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type('Rafael').should('have.value', 'Rafael').clear().should('have.value', '');
        cy.get('#lastName').type('Guerero').should('have.value', 'Guerero').clear().should('have.value', '');
        cy.get('#phone').type('9999999').should('have.value', '9999999').clear().should('have.value', '');
        cy.get('#email').type('rafael@gmail.com').should('have.value', 'rafael@gmail.com').clear().should('have.value', '');
        cy.get('#open-text-area').type('Texto').should('have.value', 'Texto').clear().should('have.value', '');
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('button', 'Enviar').click();

        cy.get('.error').should('be.visible');
    });

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit();
        cy.get('.success').should('be.visible');
    });

    it('Seleciona um produto por seu texto', () => {
        cy.get('#product').select('YouTube').should('have.value', 'youtube');
    });

    it('Seleciona produto por seu valor', () => {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria');
    });

    it('Seleciona produto por seu índice', () => {
        cy.get('#product').select(1).should('have.value', 'blog');
    });

    it('Marca o tipo de atendimento feedback - Radio', () => {
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback');
    });

    it('Marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(($radio) => { 
                //marca todos e verifica se foi marcado
                cy.wrap($radio).check(); 
                cy.wrap($radio).should('be.checked') 
            });
    });

    it('Marca ambos checkboxes, depois desmarca o ultimo', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked');
    });

    it('Seleciona arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(($input) => {
                expect($input[0].files[0].name).to.equal('example.json');
            });
    });

    it('Seleciona arquivo simulando drag-and-drop', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
            .should(($input) => {
                expect($input[0].files[0].name).to.equal('example.json');
            });
    });

    it('Seleciona um arquivo utilizando uma fixture para qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile');
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(($input) => {
                expect($input[0].files[0].name).to.equal('example.json');
            });
    });

    it('Verifica a política de privacidade em outra aba', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank');
    });

    it('Remove o target e abre na mesma aba', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click();
        
        cy.contains('Talking About Testing').should('be.visible');
    });
})
