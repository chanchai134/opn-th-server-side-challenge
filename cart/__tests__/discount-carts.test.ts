import { Cart } from "../cart"
import { Discount } from "../discount"
describe('Discount - Sometimes customer apply coupon or voucher.', () => {
  let cart: Cart
  
  beforeEach(() => {
    cart = Cart.create("CUSTOMER_01")
  })

  afterEach(() => {
    cart.destroy()
  })

  it('should successfully discount for percentage ', () => {
    const discount: Discount = { type: "percentage", amount: 10, max: 100000 }

    cart.add("P01", 2500)
    expect(cart.total()).toEqual(2500)

    cart.addDiscount("10percentage", discount)
    expect(cart.total()).toEqual(2250)

    cart.removeDiscount("10percentage")
    expect(cart.total()).toEqual(2500)
  })

  it('should successfully discount for percentage but hit max', () => {
    const discount: Discount = { type: "percentage", amount: 10, max: 100 }

    cart.add("P01", 2500)
    expect(cart.total()).toEqual(2500)

    cart.addDiscount("10percentage", discount)
    expect(cart.total()).toEqual(2400)

    cart.removeDiscount("10percentage")
    expect(cart.total()).toEqual(2500)
  })

  it('should successfully discount for fixed', () => {
    const discount: Discount = { type: "fixed", amount: 200 }

    cart.add("P01", 2500)
    expect(cart.total()).toEqual(2500)

    cart.addDiscount("200fix", discount)
    expect(cart.total()).toEqual(2300)

    cart.removeDiscount("200fix")
    expect(cart.total()).toEqual(2500)
  })

  it('should successfully apply multiple discount', () => {
    const discountPercentage: Discount = { type: "percentage", amount: 12, max: 10000 }
    const discountFixed: Discount = { type: "fixed", amount: 190 }

    cart.add("P01", 12324)
    expect(cart.total()).toEqual(12324)

    cart.addDiscount("12percentage", discountPercentage)
    expect(cart.total()).toEqual(10845.12)

    cart.addDiscount("fixed", discountFixed)
    expect(cart.total()).toEqual(10655.12)

    cart.removeDiscount("12percentage")
    expect(cart.total()).toEqual(12134)

    cart.removeDiscount("fixed")
    expect(cart.total()).toEqual(12324)
  })
})
