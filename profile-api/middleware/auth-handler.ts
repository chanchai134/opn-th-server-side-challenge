import * as jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from "express"
import { passwordJwt } from '../password-jwt'

export const authHandler = (req: Request, res: Response, next: NextFunction) => {
    if(req.headers.authorization) {
        try {
            const result = jwt.verify(req.headers.authorization.replace(/^Bearer /, ""), passwordJwt) as jwt.JwtPayload
            req.email = result["email"]
            next()
        } catch {
            res.status(401).send()
        }
    } else {
        res.status(401).send()
    }
}
