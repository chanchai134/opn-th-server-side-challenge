export class Cart {
    private _products: Record<string, number> = {} // product_id to quantity

    constructor(private customer_id: string) {}

    // Create cart object
    static create(customer_id: string): Cart {
        return new Cart(customer_id)
    }

    // Add or increase item quantity in cart by product id.
    add(product_id: string, quantity: number) {
        if(this._products[product_id]) {
            this._products[product_id] += quantity
        } else {
            this._products[product_id] = quantity
        }
    }

    // Replace item quantity or remove item from cart by product id.
    update(product_id: string, quantity: number) {
        if(quantity) {
            this._products[product_id] = quantity
        } else {
            delete this._products[product_id]
        }
    }

    // Delete item from cart by product id.
    remove(product_id: string) {
        delete this._products[product_id]
    }

    // Delete cart object.
    destroy() {
        this._products = {}
    }

    // Check id product is already in cart, boolean returned.
    has(product_id: string) {
        return !!this._products[product_id]
    }

    // Check if cart contains any items, boolean returned.
    isEmpty() {
        return this.quantity() === 0
    }

    cloneProduct() {
        const products: Record<string, number> = {}
        Object.keys(this._products).forEach(id => { products[id] = this._products[id]})
        return products
    }

    // Display list of items and quantity, json returned.
    count = this.cloneProduct

    // Get number of different items, int returned.
    quantity() {
        return Object.keys(this._products).length 
    }

    // Get amount of total items, int returned.
    total() {
        return Object.values(this._products).reduce((acc, curr) => acc+curr, 0)
    }
}