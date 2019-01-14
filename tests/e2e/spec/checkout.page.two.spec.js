import { restartApp } from '../helpers/utils';
import LoginScreen from '../screenObjects/login';
import InventoryListScreen from '../screenObjects/inventoryList';
import CartContent from '../screenObjects/cart';
import AppHeader from '../screenObjects/appHeader';
import CheckoutPageOne from '../screenObjects/checkoutPageOne';
import CheckoutPageTwo from '../screenObjects/checkoutPageTwo';
import CheckoutComplete from '../screenObjects/checkoutComplete';
import { LOGIN_USERS, PERSONAL_INFO } from '../helpers/e2eConstants';

let selectedSwagItemText;

describe('Checkout: Overview', () => {
  beforeEach(() => {
    // Restart the app before each session, only not for the first session
    restartApp();
    LoginScreen.signIn(LOGIN_USERS.STANDARD);

    // Add an item to the cart
    InventoryListScreen.waitForIsDisplayed();
    selectedSwagItemText = InventoryListScreen.getSwagItemText(0);
    InventoryListScreen.addSwagItemToCart(0);

    // Open the cart
    AppHeader.openCart();
    CartContent.waitForIsDisplayed();

    // Go to checkout page one
    CartContent.goToCheckout();
    CheckoutPageOne.waitForIsDisplayed();

    // Submit the personal info
    CheckoutPageOne.submitPersonalInfo(PERSONAL_INFO.STANDARD);
    CheckoutPageTwo.waitForIsDisplayed();
  });

  it('should show the correct selected item in the overview', () => {
    expect(selectedSwagItemText).toContain(
      CheckoutPageTwo.getSwagItemText(0),
      'The selected swag item is not equal.',
    );
  });

  it('should be able to finish the checkout', () => {
    CheckoutPageTwo.finishCheckout();
    CheckoutComplete.waitForIsDisplayed();

    expect(CheckoutPageTwo.isDisplayed()).toEqual(false, 'The Checkout: Overview screen is still visible.');
  });
});
