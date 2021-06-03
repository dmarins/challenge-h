/// <reference types='cypress' />

describe('DefaultAntecipation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('deve calcular a antecipação padrão conforme o esperado', () => {
    cy.get('[data-test-id="amount"]').type('1000').should('have.value', '1000');
    cy.get('[data-test-id="installments"]').type('1').should('have.value', '1');
    cy.get('[data-test-id="mdr"]').type('1').should('have.value', '1');

    cy.wait(800);

    cy.get('[data-test-id="value-1"]').contains('980,00');
    cy.get('[data-test-id="value-15"]').contains('985,00');
    cy.get('[data-test-id="value-30"]').contains('990,00');
    cy.get('[data-test-id="value-90"]').contains('990,00');
  });

  it('deve estimular a validação de obrigatoridade do campo amount', () => {
    cy.get('[data-test-id="amount"]').then((elem) => {
      let title = elem.attr('title');
      cy.wrap(title).should('eq', 'Campo obrigatório');
    });

    cy.get('[data-test-id="amount"]')
      .type('1000')
      .clear()
      .then((elem) => {
        let title = elem.attr('title');
        cy.wrap(title).should('eq', 'Campo obrigatório');
      });
  });

  it('deve estimular a validação de formato do campo amount', () => {
    cy.get('[data-test-id="amount"]')
      .type('aaa')
      .wait(300)
      .then((elem) => {
        let title = elem.attr('title');
        cy.wrap(title).should('eq', 'Apenas números são aceitos');
      });
  });

  it('deve estimular a validação de limite do campo amount', () => {
    cy.get('[data-test-id="amount"]')
      .type('100')
      .wait(300)
      .then((elem) => {
        let title = elem.attr('title');
        cy.wrap(title).should('eq', 'O valor não pode ser menor que 1000');
      });
  });

  it('deve estimular a validação de obrigatoridade do campo installments', () => {
    cy.get('[data-test-id="installments"]').then((elem) => {
      let title = elem.attr('title');
      cy.wrap(title).should('eq', 'Campo obrigatório');
    });

    cy.get('[data-test-id="installments"]')
      .type('1')
      .clear()
      .then((elem) => {
        let title = elem.attr('title');
        cy.wrap(title).should('eq', 'Campo obrigatório');
      });
  });

  it('deve estimular a validação de formato do campo installments', () => {
    cy.get('[data-test-id="installments"]')
      .type('aaa')
      .wait(300)
      .then((elem) => {
        let title = elem.attr('title');
        cy.wrap(title).should('eq', 'Apenas números são aceitos');
      });
  });

  it('deve estimular a validação de limite do campo installments', () => {
    cy.get('[data-test-id="installments"]')
      .type('15')
      .wait(300)
      .then((elem) => {
        let title = elem.attr('title');
        cy.wrap(title).should('eq', 'O valor deve estar entre 1 e 12');
      });
  });

  it('deve estimular a validação de obrigatoridade do campo mdr', () => {
    cy.get('[data-test-id="mdr"]').then((elem) => {
      let title = elem.attr('title');
      cy.wrap(title).should('eq', 'Campo obrigatório');
    });

    cy.get('[data-test-id="mdr"]')
      .type('1')
      .clear()
      .then((elem) => {
        let title = elem.attr('title');
        cy.wrap(title).should('eq', 'Campo obrigatório');
      });
  });

  it('deve estimular a validação de formato do campo mdr', () => {
    cy.get('[data-test-id="mdr"]')
      .type('aaa')
      .wait(300)
      .then((elem) => {
        let title = elem.attr('title');
        cy.wrap(title).should('eq', 'Apenas números são aceitos');
      });
  });

  it('deve estimular a validação de limite do campo mdr', () => {
    cy.get('[data-test-id="mdr"]')
      .type('0')
      .wait(300)
      .then((elem) => {
        let title = elem.attr('title');
        cy.wrap(title).should('eq', 'O valor deve estar entre 1 e 100');
      });
  });
});
