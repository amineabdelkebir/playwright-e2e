import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';

test('Guest user can add product to cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  await homePage.goto();
  await homePage.searchProduct('Build your own computer');

  await page.getByRole('link', { name: 'Build your own computer' }).click();

  await productPage.addToCart();
  await cartPage.goToCart();
  await cartPage.verifyProductInCart('Build your own computer');
});
