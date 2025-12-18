import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignupPage } from '../pages/SignupPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

type User = {
  email: string;
  password: string;
};

export const test = base.extend<{
  loggedInUser: User;
  homePage: HomePage;
  productPage: ProductPage;
  cartPage: CartPage;
}>({
  // Create a fresh user and register
  loggedInUser: async ({ page }, use) => {
    const homePage = new HomePage(page);
    const signupPage = new SignupPage(page);

    const user: User = {
      email: `user_${Date.now()}@test.com`,
      password: 'Test@1234',
    };

    // Register user
    await homePage.goto();
    await homePage.goToRegister();
    await signupPage.register({
      firstName: 'Auto',
      lastName: 'User',
      email: user.email,
      password: user.password,
    });
    await signupPage.verifyRegistrationSuccess();

    await use(user);
  },

  // Provide Page Objects for tests
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

export { expect } from '@playwright/test';
