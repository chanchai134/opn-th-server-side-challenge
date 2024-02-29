import Joi from "joi"
import * as joiDate from "@joi/date"
import dayjs from 'dayjs'
import { database } from "../database"
import { ProfileError } from "../profile-error"

interface EditProfile {
    dateOfBirth?: string
    gender?: "male" | "female"
    address?: string
    subscribeNewsletter?: boolean
}

const editProfileValidator = Joi.object({
    dateOfBirth: Joi.extend(joiDate.default).date().format("YYYY-MM-DD").optional(),
    gender: Joi.string().valid("male", "female").optional(),
    address: Joi.string().optional(),
    subscribeNewsletter: Joi.boolean().optional()
})

export const editProfile = (email: string, payload: EditProfile): void => {
    const { error } = editProfileValidator.validate(payload)
    if(error) {
        throw new ProfileError(`${error}`)
    }
    const member = database.get(email)!
    if(payload.dateOfBirth) {
        member.dateOfBirth = dayjs(payload.dateOfBirth, "YYYY-MM-DD")
    }
    if(payload.gender) {
        member.gender = payload.gender
    }
    if(payload.address) {
        member.address = payload.address
    }
    if(payload.subscribeNewsletter) {
        member.subscribeNewsletter = payload.subscribeNewsletter
    }
}
