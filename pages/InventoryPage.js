class InventoryPage {
    constructor(page){
        this.page = page;
        this.pageTitle = page.locator('.title');
        this.cartIcon = page.locator('.shopping_cart_link')
        this.cartBadge = page.locator('.shopping_cart_badge');
    }
    
    async isOnInventoryPage() {
        return await this.pageTitle.isVisible();
    }

    async addProductToCart(productName) {
        const productKey = productName.toLowerCase().replace(/ /g, '-');
        const addToCartButton = this.page.locator(`[data-test="add-to-cart-${productKey}"]`);
        await addToCartButton.click();
    }

    async getCartCount() {
        return await this.cartBadge.textContent();
    }

    async goToCart() {
        await this.cartIcon.click();
    }
}

module.exports = InventoryPage;