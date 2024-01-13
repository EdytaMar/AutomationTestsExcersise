/// <reference types='cypress' />
const { findAllByAltText } = require("@testing-library/dom");

describe("Contact Us Form Test", () => {
  it("should submit the contact us form successfully", () => {
    cy.visit("https://automationexercise.com")
      .get('a[href="/"]')
      .contains("Home")
      .should("be.visible")
      .invoke("css", "color", "orange")

      .get('a[href="/contact_us"]')
      .contains("Contact us")
      .click()

      .get('a[href="/contact_us"]')
      .invoke("css", "color", "orange");

    cy.get('input[name="name"]').type("Edyta Markowska");
    cy.get('input[name="email"]').type("edyta.markowska@example.com");
    cy.get('input[name="subject"]').type("Cypress Test Subject");
    cy.get('textarea[name="message"]').type("This is a Cypress test message.");
    cy.contains("Submit").click();
    cy.on("window:confirm", () => true);
    cy.contains(
      "Success! Your details have been submitted successfully."
    ).should("be.visible");
    cy.contains("Home").click();
  });
});

describe("Negative Scenario Contact Us Form Test", () => {
  it("should handle the case of using incorrect credentials", () => {
    cy.visit("https://automationexercise.com")
      .get('a[href="/"]')
      .contains("Home")
      .should("be.visible")
      .invoke("css", "color", "orange")

      .get('a[href="/contact_us"]')
      .contains("Contact us")
      .click()

      .get('a[href="/contact_us"]')
      .invoke("css", "color", "orange");

    cy.get('input[name="name"]').type("Edyta Markowska");
    cy.get('input[name="email"]').type("edyta");
    cy.get('input[name="subject"]').type("Cypress Test Subject");
    cy.get('textarea[name="message"]').type("This is a Cypress test message.");
    cy.contains("Submit").click();
    cy.on("window:confirm", (str) => {
      expect(str).to.equal(
        "Please include an '@' in the email address. 'edyta' is missing an '@'."
      );
    });
    cy.contains(
      "Success! Your details have been submitted successfully."
    ).should("not.exist");
  });
});
