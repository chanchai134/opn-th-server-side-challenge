import { Request, Response, NextFunction } from "express"

export class ProfileError extends Error {
    constructor(message: string) {
        super(message)
    }
}

export const errorHandling = (err: Error, _: Request, res: Response, __: NextFunction) => {
    if(err instanceof ProfileError) {
        res.status(400).type("text/plain").send(err.message)
    } else {
        res.status(500).send()
    }
}