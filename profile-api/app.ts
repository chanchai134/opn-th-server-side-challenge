import express from "express"
import { profile } from "./profile-controller"
import { errorHandling } from "./profile-error"

const app = express()

app.use(express.json())

app.use("/profile", profile)

app.use("*", (_, res) => {
    res.status(404).type("text/plain").send("page not found")
})

app.use(errorHandling)

app.listen(3000, () => {
    console.log("profile app listening on port 3000")
})
