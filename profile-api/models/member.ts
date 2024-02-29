import { Gender } from "./gender"

export interface Member {
    email: string
    password: string
    name: string
    dateOfBirth: string
    gender: Gender
    address: string
    subscribeNewsletter: boolean
}
