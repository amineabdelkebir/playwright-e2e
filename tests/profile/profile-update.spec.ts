import { test } from '@playwright/test';
import { ProfilePage } from '../../pages/ProfilePage';

test('Logged-in user can update profile', async ({ page }) => {
  const profilePage = new ProfilePage(page);

  // Optional: use storageState for already logged-in user
  await profilePage.gotoProfile();

  const userData = {
    address: '123 Main St, New York, NY',
    phone: '+1234567890',
    cardNumber: '4111111111111111',
    expiry: '12/25',
    cvc: '123',
  };

  await profilePage.updateProfile(userData);
});
