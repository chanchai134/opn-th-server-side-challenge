import BigNumber from "bignumber.js";
import { Discount } from "./discount"
import { Condition } from "./condition";
import { Reward } from "./reward";

export class Cart {
    private products: Record<string, number> = {} // product_id to quantity
    private discounts: Record<string, Discount> = {}
    private rewards: Record<string, [Condition, Reward]> = {}

    constructor(private customer_id?: string) {}

    // Create cart object
    static create(customer_id: string): Cart {
        return new Cart(customer_id)
    }

    // Add or increase item quantity in cart by product id.
    add(product_id: string, quantity: number) {
        let finalQuantity = quantity
        if(this.products[product_id]) {
            finalQuantity += this.products[product_id]
        }
        this.update(product_id, finalQuantity)
    }

    // Replace item quantity or remove item from cart by product id.
    update(product_id: string, quantity: number) {
        if(quantity) {
            this.products[product_id] = quantity
        } else {
            this.remove(product_id)
        }
    }

    // Delete item from cart by product id.
    remove(product_id: string) {
        delete this.products[product_id]
    }

    // Delete cart object.
    destroy() {
        delete this.customer_id
        this.discounts = {}
        this.products = {}
    }

    // Check id product is already in cart, boolean returned.
    has(product_id: string) {
        return !!(this.productWithFreebie()[product_id])
    }

    // Check if cart contains any items, boolean returned.
    isEmpty() {
        return !this.quantity()
    }

    private productWithFreebie() {
        const products = { ...this.products }
        for(const [condition, reward] of Object.values(this.rewards)) {
            if(products[condition.product_id] && condition.type === "contains") {
                if(products[reward.product_id]) {
                    products[reward.product_id] += reward.quantity
                } else {
                    products[reward.product_id] = reward.quantity
                }
            }
        }
        return products
    }

    // Display list of items and quantity, json returned. ?? why name count <<<<<<<<<
    count = this.productWithFreebie

    // Get number of different items, int returned.
    quantity() {
        return Object.keys(this.products).length 
    }

    // Get amount of total items, int returned.
    total() {
        let totalPrice = Object.values(this.products).reduce((acc, curr) => acc+curr, 0)
        for(const discount of Object.values(this.discounts)) {
            totalPrice = this.applyDiscount(totalPrice, discount)
        }
        return totalPrice
    }

    private applyDiscount(price: number, discount: Discount) {
        switch(discount.type) {
            case "fixed":
                const discountedPrice = price - discount.amount
                return discountedPrice > 0 ? discountedPrice : 0
            case "percentage":
                const discountedGain = BigNumber(price)
                    .times(BigNumber(discount.amount))
                    .div(100)
                return discountedGain.gt(discount.max!) ? 
                    price-discount.max! :
                    +BigNumber(price).minus(discountedGain)
        }
    }

    addDiscount(name: string, discount: Discount) {
        this.discounts[name] = discount
    }

    removeDiscount(name: string) {
        delete this.discounts[name]
    }

    addFreebie(name: string, condition: Condition, reward: Reward) {
        this.rewards[name] = [condition, reward]
    }
}