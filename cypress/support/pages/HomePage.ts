// cypress/support/pages/HomePage.ts

class HomePage {
  visit(): void {
    cy.visit("/");
    cy.log("Visiting the homepage");
    cy.get("body").should("be.visible");
    cy.log("Body is visible");
  }

  selectStartDate(day: number): void {
    cy.get('[id="startDateDatePicker"]').should("be.visible").click();
    cy.log("Clicked on the start date input");

    const daySelector = `.react-datepicker__day--${String(day).padStart(
      3,
      "0"
    )}`;
    cy.get(daySelector).should("be.visible").click();
    cy.log(`Selected the ${day}th day of the month`);
  }

  submitForm(): void {
    cy.get('[id="submitButton"]').should("be.visible").click();
    cy.log("Clicked submit button");
  }

  getAsteroidGrid(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .get('[id="asteroidGrid"]', { timeout: 20000 })
      .should("be.visible");
  }

  getAsteroidCards(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[id="asteroidGrid"]');
  }
  getAsteroidCard(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('[id="asteroidCard"]');
  }

  /**
   * Clicks the first asteroid card in the grid.
   */
  clickFirstAsteroidCard(): void {
    this.getAsteroidCards()
      .should("exist")
      .should("have.length.at.least", 1)
      .then(($cards) => {
        cy.log(`Number of asteroid cards: ${$cards.length}`);
        if ($cards.length > 0) {
          cy.wrap($cards)
            .first()
            .scrollIntoView()
            .should("be.visible")
            .then(($firstCard) => {
              const cardText = $firstCard.text();
              cy.log(`Clicking on first card: ${cardText}`);
              cy.wrap($firstCard).click();
            });
        } else {
          cy.log("No asteroid cards found");
          throw new Error("No asteroid cards found");
        }
      });
  }
}

export default HomePage;
