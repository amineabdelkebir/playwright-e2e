import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignupPage } from '../pages/SignupPage';

type User = {
  email: string;
  password: string;
};

export const test = base.extend<{
  loggedInUser: User;
}>({
  loggedInUser: async ({ page }, use) => {
    const homePage = new HomePage(page);
    const signupPage = new SignupPage(page);

    const user = {
      email: `user_${Date.now()}@test.com`,
      password: 'Test@1234',
    };

    await homePage.goto();
    //await homePage.goToRegister();

    await signupPage.register({
      firstName: 'Auto',
      lastName: 'User',
      email: user.email,
      password: user.password,
    });

    await signupPage.verifyRegistrationSuccess();

    await use(user);
  },
});

export { expect } from '@playwright/test';
