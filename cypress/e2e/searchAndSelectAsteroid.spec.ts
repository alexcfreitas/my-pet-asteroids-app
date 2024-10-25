/// <reference types="cypress" />

import HomePage from "../support/pages/HomePage";

describe("Search and Select Asteroid", () => {
  const homePage = new HomePage();

  beforeEach(() => {
    homePage.visit();
  });

  it("should search for asteroids and select the first one", () => {
    homePage.selectStartDate(25);

    homePage.submitForm();
  });
});
