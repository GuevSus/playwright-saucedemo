class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.checkoutTitle = page.locator('.title');
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.confirmationMessage = page.locator('.complete-header');
    }

    async isOnCheckoutPage() { 
        return await this.checkoutTitle.isVisible();
    }

    async fillShippingInfo(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    async clickFinish() { 
        await this.finishButton.click();
    }

    async getConfirmationMessage() {
        return await this.confirmationMessage.textContent();
    }
}

module.exports = CheckoutPage;