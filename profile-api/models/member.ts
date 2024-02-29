import { Address } from "./address"
import { Gender } from "./gender"

export interface Member {
    email: string,
    password: string,
    name: string,
    dateOfBirth: string,
    gender: Gender,
    address: Address,
    subscribeNewsletter: boolean
}
