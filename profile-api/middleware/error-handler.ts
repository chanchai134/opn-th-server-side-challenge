import { Request, Response, NextFunction } from "express"
import { ProfileError } from "../profile-error"

export const errorHandler = (err: Error, _: Request, res: Response, __: NextFunction) => {
    if(err instanceof ProfileError) {
        res.status(400).type("text/plain").send(err.message)
    } else {
        res.status(500).send()
    }
}
