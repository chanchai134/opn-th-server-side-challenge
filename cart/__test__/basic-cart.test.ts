import { Cart } from "../cart"
describe('Basic - Cart service that can manage items.', () => {
  let cart: Cart
  
  beforeEach(() => {
    cart = Cart.create("CUSTOMER_01")
  })

  afterEach(() => {
    cart.destroy()
  })

  it('should successfully add 0 quantity', () => {
    cart.add("P01", 0)

    expect(cart.has("P01")).toBe(false)
    expect(cart.isEmpty()).toBe(true)
    expect(cart.quantity()).toEqual(0)
    expect(cart.total()).toEqual(0)
    expect(cart.count()).toEqual({}) 
  })

  it('should successfully add positive quantity', () => {
    cart.add("P01", 4)

    expect(cart.has("P01")).toBe(true)
    expect(cart.isEmpty()).toBe(false)
    expect(cart.quantity()).toEqual(1)
    expect(cart.total()).toEqual(4)
    expect(cart.count()).toEqual({ P01: 4 }) 
  })

  it('should successfully replace by using update', () => {
    cart.add("P01", 4)
    cart.update("P01", 9999)

    expect(cart.has("P01")).toBe(true)
    expect(cart.isEmpty()).toBe(false)
    expect(cart.quantity()).toEqual(1)
    expect(cart.total()).toEqual(9999)
    expect(cart.count()).toEqual({ P01: 9999 }) 
  })

  it('should successfully add by using update', () => {
    cart.update("P01", 9999)

    expect(cart.has("P01")).toBe(true)
    expect(cart.isEmpty()).toBe(false)
    expect(cart.quantity()).toEqual(1)
    expect(cart.total()).toEqual(9999)
    expect(cart.count()).toEqual({ P01: 9999 }) 
  })

  it('should successfully remove by using update and set quantity 0', () => {
    cart.add("P01", 4)
    cart.update("P01", 0)

    expect(cart.has("P01")).toBe(false)
    expect(cart.isEmpty()).toBe(true)
    expect(cart.quantity()).toEqual(0)
    expect(cart.total()).toEqual(0)
    expect(cart.count()).toEqual({}) 
  })

  it('should successfully remove ', () => {
    cart.add("P01", 4)
    cart.remove("P01")

    expect(cart.has("P01")).toBe(false)
    expect(cart.isEmpty()).toBe(true)
    expect(cart.quantity()).toEqual(0)
    expect(cart.total()).toEqual(0)
    expect(cart.count()).toEqual({}) 
  })

  it('should successfully add, update and remove with multiple proudct', () => {
    cart.add("P01", 4)
    cart.add("P02", 4)
    cart.add("P03", 12)

    expect(cart.has("P01")).toBe(true)
    expect(cart.has("P02")).toBe(true)
    expect(cart.has("P03")).toBe(true)
    expect(cart.isEmpty()).toBe(false)
    expect(cart.quantity()).toEqual(3)
    expect(cart.total()).toEqual(20)
    expect(cart.count()).toEqual({
      P01: 4,
      P02: 4,
      P03: 12
    })

    cart.add("P01", 92)
    cart.add("P01", 92)
    cart.add("P01", 92)
    cart.update("P02", 11)
    cart.remove("P03")
    cart.update("W04", 1192)
    cart.add("W04", 1192)

    expect(cart.has("P01")).toBe(true)
    expect(cart.has("P02")).toBe(true)
    expect(cart.has("P03")).toBe(false)
    expect(cart.has("W04")).toBe(true)
    expect(cart.isEmpty()).toBe(false)
    expect(cart.quantity()).toEqual(3)
    expect(cart.total()).toEqual(2675)
    expect(cart.count()).toEqual({
      P01: 280,
      P02: 11,
      W04: 2384
    })

    cart.add("P03", 29)

    expect(cart.has("P01")).toBe(true)
    expect(cart.has("P02")).toBe(true)
    expect(cart.has("P03")).toBe(true)
    expect(cart.has("W04")).toBe(true)
    expect(cart.isEmpty()).toBe(false)
    expect(cart.quantity()).toEqual(4)
    expect(cart.total()).toEqual(2704)
    expect(cart.count()).toEqual({
      P01: 280,
      P02: 11,
      P03: 29,
      W04: 2384
    })

    cart.destroy()

    expect(cart.isEmpty()).toBe(true)
    expect(cart.quantity()).toEqual(0)
    expect(cart.total()).toEqual(0)
    expect(cart.count()).toEqual({})
  })
})
