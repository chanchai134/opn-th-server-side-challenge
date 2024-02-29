import express, { Response } from "express"
import { profile } from "./profile-controller"

const app = express()

app.use(express.json())

app.use("/profile",profile)

app.use("*", (_, res: Response) => {
    res.status(404).type("text/plain").send("page not found")
})

app.listen(3000, () => {
    console.log("profile app listening on port 3000")
})
