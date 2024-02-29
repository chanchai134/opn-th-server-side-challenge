import { Cart } from "../cart"
import { Discount } from "../discount"

describe('Freebie & discount', () => {
  let cart: Cart
  
  beforeEach(() => {
    cart = Cart.create("CUSTOMER_01")
  })

  afterEach(() => {
    cart.destroy()
  })

  it('should successfully apply multiple discount and freebie', () => {
    const discountPercentage: Discount = { type: "percentage", amount: 12, max: 10000 }
    const discountFixed: Discount = { type: "fixed", amount: 190 }
    cart.addDiscount("12percentage", discountPercentage)
    cart.addDiscount("fixed", discountFixed)
    cart.addFreebie(
      "P01-get-GWP",
      { type: "contains", product_id: "P01" },
      { product_id: "GWP", quantity: 20 }
    )
    cart.add("P01", 12324)

    expect(cart.has("P01")).toBe(true)
    expect(cart.has("GWP")).toBe(true)
    expect(cart.quantity()).toEqual(2)
    expect(cart.total()).toEqual(10655.12)
    expect(cart.count()).toEqual({
      P01: 12324,
      GWP: 20
    })
  })
})
