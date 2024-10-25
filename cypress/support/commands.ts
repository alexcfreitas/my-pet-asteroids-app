Cypress.Commands.add("selectDate", (day: number) => {
  cy.get('[id="startDateDatePicker"]').should("be.visible").click();
  cy.log("Clicked on the start date input");

  const daySelector = `.react-datepicker__day--${String(day).padStart(3, "0")}`;
  cy.get(daySelector).should("be.visible").click();
  cy.log(`Selected the ${day}th day of the month`);
});

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      /**
       * Custom command to select a date in the datepicker.
       * @example cy.selectDate(25)
       */
      selectDate(day: number): Chainable<Element>;
    }
  }
}

export {};
