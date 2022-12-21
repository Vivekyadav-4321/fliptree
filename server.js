const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const cookieParser = require('cookie-parser')

const regsiter = require("./Register/server")
const login = require("./Login/server")
const calculator = require("./Calculator/server")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/", regsiter)
app.use("/login", login)
app.use("/calculator", calculator)

app.listen(PORT, () => {
    console.log(`Server is live at port ${PORT}`);
})