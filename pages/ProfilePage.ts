import { Page, expect, Locator } from '@playwright/test';

export class ProfilePage {
  readonly addressInput: Locator;
  readonly phoneInput: Locator;
  readonly cardNumberInput: Locator;
  readonly cardExpiryInput: Locator;
  readonly cardCvcInput: Locator;
  readonly saveButton: Locator;
  readonly successMessage: Locator;

  constructor(private page: Page) {
    this.addressInput = page.locator('#Address'); // update with actual selector
    this.phoneInput = page.locator('#Phone'); // update with actual selector
    this.cardNumberInput = page.locator('#CardNumber'); // update selector
    this.cardExpiryInput = page.locator('#CardExpiry'); // update selector
    this.cardCvcInput = page.locator('#CardCvc'); // update selector
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.successMessage = page.locator('.result'); // success message selector
  }

  async gotoProfile() {
    await this.page.goto('/customer/info'); // profile page relative URL
  }

  async updateAddress(address: string) {
    await this.addressInput.fill(address);
  }

  async updatePhone(phone: string) {
    await this.phoneInput.fill(phone);
  }

  async updatePayment(cardNumber: string, expiry: string, cvc: string) {
    await this.cardNumberInput.fill(cardNumber);
    await this.cardExpiryInput.fill(expiry);
    await this.cardCvcInput.fill(cvc);
  }

  async saveChanges() {
    await this.saveButton.click();
  }

  async verifyUpdateSuccess() {
    await expect(this.successMessage).toHaveText(/successfully/i);
  }

  async updateProfile(data: { address: string; phone: string; cardNumber: string; expiry: string; cvc: string }) {
    await this.updateAddress(data.address);
    await this.updatePhone(data.phone);
    await this.updatePayment(data.cardNumber, data.expiry, data.cvc);
    await this.saveChanges();
    await this.verifyUpdateSuccess();
  }
}
