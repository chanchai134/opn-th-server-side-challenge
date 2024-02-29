import { Router } from "express"
import { register } from "./use-cases/register"
import { login } from "./use-cases/login"
import { authHandler } from "./middleware/auth-handler"

export const router = Router()

router.post("/register", (req, res) => {
    register(req.body)
    res.status(201).send()
})

router.post("/login", (req, res) => {
    res.json({
        token: login(req.body)
    })
})

router.get("/profile", authHandler, (_, res) => {
    res.json({
        token: "s"
    })
})
