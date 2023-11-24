describe('Verificar mi aplicacion', () => {

  it('Verificar login con credenciales incorrectas', () => {

    cy.visit('http://localhost:8100/').then(() => {
      cy.get('#correo').invoke('val', 'correo-inexistente@duocuc.cl');
      cy.get('#password').invoke('val', '1234');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        cy.get('ion-title').should('contain.text', 'Sistema de Asistencia DUOC');
      });
    });
  });

  it('Verificar login con credenciales correctas', () => {

    cy.visit('http://localhost:8100/').then(() => {
      cy.get('#correo').invoke('val', 'atorres@duocuc.cl');
      cy.get('#password').invoke('val', 'gato');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        cy.get('ion-title').should('contain.text', 'Sistema de Asistencia DUOC');
        cy.contains('Cerrar Sesion').click();
      });
    });
  });
});