export interface Member {
    email: string
    password: string
    name: string
    dateOfBirth: string
    gender: "male" | "female"
    address: string
    subscribeNewsletter: boolean
}
