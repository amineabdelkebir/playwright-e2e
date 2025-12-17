import { Page, expect, Locator } from '@playwright/test';

export class ProductPage {
  readonly addToCartButton: Locator;
  readonly successBar: Locator;

  constructor(private page: Page) {
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    this.successBar = page.locator('.bar-notification.success');
  }

  async addToCart() {
    await this.addToCartButton.click();
    await expect(this.successBar).toBeVisible();
  }
}
