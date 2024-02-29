import * as jwt from 'jsonwebtoken'
import Joi from "joi"
import { database } from "../database"
import { Member } from "../models/member"
import { ProfileError } from "../profile-error"
import { passwordJwt } from '../password-jwt'

const loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export const login = (login: Pick<Member, 'email' | 'password'>): string => {
    const { error } = loginValidator.validate(login)
    if(error) {
        throw new ProfileError(`${error}`)
    }
    const found = database.has(login.email)
    if(!found || (found && database.get(login.email)!.password != login.password)) {
        throw new ProfileError(`email or password are wrong`)
    }
    return "Bearer "+jwt.sign({ email: login.email }, passwordJwt)
}
