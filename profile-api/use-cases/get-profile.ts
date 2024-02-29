import { database } from "../database"

interface Profile {
    email: string
    name: string
    age: string
    gender: "male" | "female"
    address: string
    subscribeNewsletter: boolean
}

export const getProfile = (email: string): Profile => {
    const member = database.get(email)!

    return {
        email: member.email,
        name: member.name,
        age: member.calculateAge(),
        gender: member.gender,
        address: member.address,
        subscribeNewsletter: member.subscribeNewsletter
    }
}
