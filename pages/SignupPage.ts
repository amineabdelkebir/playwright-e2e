import { Page, expect, Locator } from '@playwright/test';

export class SignupPage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly confirmPassword: Locator;
  readonly registerButton: Locator;
  readonly successMessage: Locator;

  constructor(private page: Page) {
    this.firstName = page.locator('#FirstName');
    this.lastName = page.locator('#LastName');
    this.email = page.locator('#Email');
    this.password = page.locator('#Password');
    this.confirmPassword = page.locator('#ConfirmPassword');
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.successMessage = page.locator('.result');
  }

  async register(user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);
    await this.email.fill(user.email);
    await this.password.fill(user.password);
    await this.confirmPassword.fill(user.password);
    await this.registerButton.click();
  }

  async verifyRegistrationSuccess() {
    await expect(this.successMessage).toHaveText(
      'Your registration completed'
    );
  }
}
