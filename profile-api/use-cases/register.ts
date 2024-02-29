import Joi from "joi"
import * as joiDate from "@joi/date"
import { database } from "../database"
import { Member } from "../models/member"
import { ProfileError } from "../profile-error"

const registerValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    dateOfBirth: Joi.extend(joiDate.default).date().format('YYYY-MM-DD').required(),
    gender: Joi.string().valid("male", "female").required(),
    address: Joi.string().required(),
    subscribeNewsletter: Joi.boolean().required()
})

export const register = (member: Member): void => {
    const { error } = registerValidator.validate(member)
    if(error) {
        throw new ProfileError(`${error}`)
    }
    if(database.has(member.email)) {
        throw new ProfileError(`email: ${member.email} is already existing`)
    }
    database.set(member.email, member)
}
