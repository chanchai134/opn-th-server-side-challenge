import express from "express"
import { profile } from "./controller"
import { errorHandler } from "./middleware/error-handler"
import { notFoundHandler } from "./middleware/not-found-handler"

const app = express()

app.use(express.json())
app.use("/", profile)
app.use("*", notFoundHandler)
app.use(errorHandler)

app.listen(3000, () => {
    console.log("profile app listening on port 3000")
})
