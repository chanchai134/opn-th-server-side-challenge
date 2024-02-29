import express from "express"
import { profile } from "./controller"
import { errorHandling } from "./middleware/error-handling"
import { notFound } from "./middleware/not-found"

const app = express()

app.use(express.json())
app.use("/", profile)
app.use("*", notFound)
app.use(errorHandling)

app.listen(3000, () => {
    console.log("profile app listening on port 3000")
})
