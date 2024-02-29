import express from "express"
import { router } from "./controller"
import { errorHandler } from "./middleware/error-handler"
import { notFoundHandler } from "./middleware/not-found-handler"

const app = express()

app.use(express.json())
app.use("/", router)
app.use("*", notFoundHandler)
app.use(errorHandler)

app.listen(3000, () => {
    console.log("profile app listening on port 3000")
})
