import { Router } from "express"
import { registerProfile } from "./use-cases/profile-register"

export const profile = Router()

profile.post("/", (req, res) => {
    try {
        registerProfile(req.body)
        res.status(201).send()
    } catch (e) {
        res.status(400)
    }
})