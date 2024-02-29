import { database } from "../database"
import { Member } from "../models/member"

export const getProfile = (email: string) => {
    const profile = database.get(email)!
    return {
        ...profile,
        password: undefined
    } as Omit<Member, "password">
}
