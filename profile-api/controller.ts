import { Router } from "express"
import { register } from "./use-cases/register"
import { login } from "./use-cases/login"
import { getProfile } from "./use-cases/get-profile"
import { editProfile } from "./use-cases/edit-profile"
import { deleteProfile } from "./use-cases/delete-profile"
import { authHandler } from "./middleware/auth-handler"
import { changPassword } from "./use-cases/change-password"

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

router.get("/profile", authHandler, (req, res) => {
    res.json(getProfile(req.email!))
})

router.patch("/profile", authHandler, (req, res) => {
    editProfile(req.email!, req.body)
    res.status(201).send()
})

router.delete("/profile", authHandler, (req, res) => {
    deleteProfile(req.email!)
    res.status(201).send()
})

router.patch("/password", authHandler, (req, res) => {
    changPassword(req.email!, req.body)
    res.status(201).send()
})
