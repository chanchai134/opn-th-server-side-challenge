import * as jwt from 'jsonwebtoken'
import Joi from "joi"
import { database } from "../database"
import { ProfileError } from "../profile-error"
import { passwordJwt } from '../password-jwt'

interface ChangPassword {
    currentPassword: string
    newPassword: string
}

const changPasswordValidator = Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().required()
})

export const changPassword = (email:string, payload: ChangPassword): void => {
    const { error } = changPasswordValidator.validate(payload)
    if(error) {
        throw new ProfileError(`${error}`)
    }
    const member = database.get(email)!
    member.changePassword(payload.currentPassword, payload.newPassword)
}
