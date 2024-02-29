import { Router } from "express"
import { register } from "./use-cases/register"
import { login } from "./use-cases/login"

export const profile = Router()

profile.post("/register", (req, res) => {
    register(req.body)
    res.status(201).send()
})

profile.post("/login", (req, res) => {
    res.json({
        token: login(req.body)
    })
})
