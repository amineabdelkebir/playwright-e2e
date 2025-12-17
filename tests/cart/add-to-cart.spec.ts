import { test } from '../../fixtures/testFixtures'; // custom fixtures
import { HomePage } from '../../pages/HomePage';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';

test('Logged-in user can add product to cart', async ({
  page,
  loggedInUser, // fixture providing logged-in user
}) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  // Go to home page
  await homePage.goto();

  // Search for the product
  await homePage.searchProduct('Build your own computer');

  // Click the product link (using page locator is fine)
  await page.getByRole('link', { name: 'Build your own computer' }).click();

  // Select storage: 400 GB
  await page.locator('input[type="radio"][value="400 GB"]').check();

  // Select OS: Vista Premium
  await page.locator('input[type="radio"][value="Vista Premium"]').check();

  // Select software: Microsoft Office + Acrobat Reader
  await page.locator('input[type="checkbox"][value="Microsoft Office"]').check();
  await page.locator('input[type="checkbox"][value="Acrobat Reader"]').check();
  // Add product to cart
  await productPage.addToCart();

  // Go to cart and verify product
  await cartPage.goToCart();
  await cartPage.verifyProductInCart('Build your own computer');
});
