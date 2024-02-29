export interface Discount {
    type: "fixed" | "percentage"
    amount: number
    max?: number
}
