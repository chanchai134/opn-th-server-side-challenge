import * as jwt from 'jsonwebtoken'
import Joi from "joi"
import { database } from "../database"
import { ProfileError } from "../profile-error"
import { passwordJwt } from '../password-jwt'

interface Login {
    email: string
    password: string
}

const loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export const login = (login: Login): string => {
    const { error } = loginValidator.validate(login)
    if(error) {
        throw new ProfileError(`${error}`)
    }
    const found = database.has(login.email)
    if(!found || (found && !(database.get(login.email)!.verifyPassword(login.password)))) {
        throw new ProfileError(`email or password are wrong`)
    }
    return "Bearer "+jwt.sign({ 
        email: login.email,
        version: database.get(login.email)!.version
    }, passwordJwt)
}
