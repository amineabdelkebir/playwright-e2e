import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly registerLink: Locator;
  readonly loginLink: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  constructor(private page: Page) {
    this.registerLink = page.getByRole('link', { name: 'Register' });
    this.loginLink = page.getByRole('link', { name: 'Log in' });
    this.searchInput = page.getByPlaceholder('Search store');
    this.searchButton = page.getByRole('button', { name: 'Search' });
  }

  async goto() {
    await this.page.goto('/');
  }
/*
  async goToRegister() {
    await this.registerLink.click();
  }
*/
  async searchProduct(productName: string) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }
}
