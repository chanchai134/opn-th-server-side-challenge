import Joi from "joi"
import * as joiDate from "@joi/date"
import dayjs from 'dayjs'
import { database } from "../database"
import { ProfileError } from "../profile-error"
import { Member } from "../models/member"

interface Register {
    email: string
    password: string
    name: string
    dateOfBirth: string
    gender: "male" | "female"
    address: string
    subscribeNewsletter: boolean
}

const registerValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
    dateOfBirth: Joi.extend(joiDate.default).date().format("YYYY-MM-DD").required(),
    gender: Joi.string().valid("male", "female").required(),
    address: Joi.string().required(),
    subscribeNewsletter: Joi.boolean().required()
})

export const register = (payload: Register): void => {
    const { error } = registerValidator.validate(payload)
    if(error) {
        throw new ProfileError(`${error}`)
    }
    if(database.has(payload.email)) {
        throw new ProfileError(`email: ${payload.email} is already existing`)
    }
    database.set(payload.email, new Member(
        payload.email,
        payload.password,
        payload.name,
        dayjs(payload.dateOfBirth, "YYYY-MM-DD"),
        payload.gender,
        payload.address,
        payload.subscribeNewsletter
    ))
}
