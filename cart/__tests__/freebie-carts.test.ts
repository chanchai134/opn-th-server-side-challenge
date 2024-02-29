import { Cart } from "../cart"

describe('Freebie - Buy A get B for free!', () => {
  let cart: Cart
  
  beforeEach(() => {
    cart = Cart.create("CUSTOMER_01")
  })

  afterEach(() => {
    cart.destroy()
  })

  it('should successfully apply freebie', () => {
    cart.add("P01", 12324)
    cart.addFreebie(
      "P01-get-GWP",
      { type: "contains", product_id: "P01" },
      { product_id: "GWP", quantity: 20 }
    )

    expect(cart.has("P01")).toBe(true)
    expect(cart.has("GWP")).toBe(true)
    expect(cart.quantity()).toEqual(2)
    expect(cart.count()).toEqual({
      P01: 12324,
      GWP: 20
    })
  })

  it('should not apply freebie when not match condition', () => {
    cart.add("P01", 12324)
    cart.addFreebie(
      "P01-get-GWP",
      { type: "contains", product_id: "P01999999" },
      { product_id: "GWP", quantity: 20 }
    )

    expect(cart.has("P01")).toBe(true)
    expect(cart.quantity()).toEqual(1)
    expect(cart.count()).toEqual({
      P01: 12324
    })
  })
})
