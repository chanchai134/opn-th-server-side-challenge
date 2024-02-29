import * as jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from "express"
import { passwordJwt } from '../password-jwt'
import { database } from '../database'

export const authHandler = (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!(req.headers.authorization)) {
            throw new Error()
        }
        const result = jwt.verify(req.headers.authorization.replace(/^Bearer /, ""), passwordJwt) as jwt.JwtPayload
        if(!database.has(result["email"])){
            throw new Error()
        }
        req.email = result["email"]
        next()
    } catch {
        res.status(401).type("text/plain").send("Unauthorized")
    }
}
