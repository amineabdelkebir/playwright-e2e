import { Page, expect, Locator } from '@playwright/test';

export class CartPage {
  readonly cartLink: Locator;
  readonly cartTable: Locator;

  constructor(private page: Page) {
    this.cartLink = page.getByRole('link', { name: 'Shopping cart' });
    this.cartTable = page.locator('.cart');
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async verifyProductInCart(productName: string) {
    await expect(this.cartTable).toContainText(productName);
  }
}
