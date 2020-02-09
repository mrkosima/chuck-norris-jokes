describe("Login Form", () => {
  const emailInput = `[data-testid="email-input"]`;
  const emailError = `[data-testid="email-error"]`;
  const passwordInput = `[data-testid="password-input"]`;
  const passwordError = `[data-testid="password-error"]`;
  const loginSubmit = `[data-testid="login-submit"]`;

  beforeEach(() => {
    cy.visit("/");
  });

  it("should render login page and validate form inputs", () => {
    cy.get(".login-form").should("be.visible");
    cy.get("#root").should("be.visible");
  });

  it("should validate email input", () => {
    cy.get(emailError).should("not.exist");
    cy.get(loginSubmit).click();
    cy.get(emailError).should("have.text", "Required");
    cy.get(emailInput).type("aasdggabc");
    cy.get(emailError).should("have.text", "Should be valid email");
    cy.get(emailInput).type("test@test.com");
    cy.get(emailError).should("not.exist");
  });

  it("should validate password input", () => {
    cy.get(passwordError).should("not.exist");
    cy.get(loginSubmit).click()
    cy.get(passwordError).should("have.text", "Required");
    cy.get(passwordInput).type("a");
    cy.get(passwordError).should(
      "have.text",
      "Must contain at least two non-overlapping pairs of letters"
    );
    cy.get(passwordInput).type("aBB");
    cy.get(passwordError).should(
      "have.text",
      "Should contain only lowercase letters"
    );
    cy.get(passwordInput).type("{backspace}{backspace}bb");
    cy.get(passwordError).should(
      "have.text",
      "Must include one increasing straight of at least three letters"
    );
    cy.get(passwordInput).type("xyz1");
    cy.get(passwordInput).type("{backspace}");
    cy.get(passwordError).should("not.exist");
  });

  it("should pass validation and login", () => {
    cy.get('[data-testid="email-input"]').type("test@test.com");
    cy.get('[data-testid="password-input"]').type("aabbabc");
    cy.get('[data-testid="login-submit"]').click();
    cy.get(".login-form").should("not.exist");
  });
});
