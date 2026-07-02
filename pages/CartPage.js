class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.cartTitle = page.locator('.title');
    }

    async isOnCartPage() {
        return await this.cartTitle.isVisible();
    }

    async getCartItemsCount() {
        return await this.cartItems.count();
    }

    async isProductInCart(productName) {
        const productLocator = this.page.locator(`.inventory_item_name:has-text("${productName}")`);
        return await productLocator.isVisible();
    }

    async proceedToCheckout() { 
        await this.checkoutButton.click();
    }
}

module.exports = CartPage;