import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { SignupPage } from '../../pages/SignupPage';

test('User can sign up successfully', async ({ page }) => {
  const homePage = new HomePage(page);
  const signupPage = new SignupPage(page);

  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: `john_${Date.now()}@mail.com`,
    password: 'Test@1234',
  };

  await homePage.goto();
  await homePage.goToRegister();
  await signupPage.register(user);
  await signupPage.verifyRegistrationSuccess();
  
});
