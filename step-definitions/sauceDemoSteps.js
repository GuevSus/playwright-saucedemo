const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');

Given('el usuario abre la página de SauceDemo', async function () {
    this.loginPage = new LoginPage(this.page);
    await this.loginPage.navigate();
});

When('el usuario ingresa el usuario {string} y contraseña {string}', async function (username, password) {
    await this.loginPage.login(username, password);
});

Then('el usuario debería ver la página de productos', async function () {
    this.inventoryPage = new InventoryPage(this.page);
    const isVisible = await this.inventoryPage.isOnInventoryPage();
    expect(isVisible).toBe(true);
});

Then('el usuario debería ver un mensaje de error', async function () {
    const errorMsg = await this.loginPage.getErrorMessage();
    expect(errorMsg).toContain('Epic sadface');
});

When('el usuario agrega el producto {string} al carrito', async function (productName) {
    this.inventoryPage = new InventoryPage(this.page);
    await this.inventoryPage.addProductToCart(productName);
});

Then('el carrito debería mostrar un producto', async function () {
    const actualCount = await this.inventoryPage.getCartCount();
    expect(actualCount).toBe('1');
});

When('el usuario va al carrito', async function () {
    await this.inventoryPage.goToCart();
    this.cartPage = new CartPage(this.page);
});

Then('el usuario debería ver el producto {string} en el carrito', async function (productName) {
    const isProductVisible = await this.cartPage.isProductInCart(productName);
    expect(isProductVisible).toBe(true);
});

When('el usuario procede al checkout', async function () {
    await this.cartPage.proceedToCheckout();
    this.checkoutPage = new CheckoutPage(this.page);
});

When('el usuario completa la información de envío con nombre {string}, apellido {string} y código postal {string}', async function (firstName, lastNamme, postalCode) {
    await this.checkoutPage.fillShippingInfo(firstName, lastNamme, postalCode);
    await this.checkoutPage.clickContinue();
});

When('el usuario finaliza la compra', async function () {
    await this.checkoutPage.clickFinish();
});

Then('el usuario debería ver el mensaje de confirmación {string}', async function (expectMessage) {
    const actualMsg = await this.checkoutPage.getConfirmationMessage();
    expect(actualMsg).toContain(expectMessage);
});