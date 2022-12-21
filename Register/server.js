const express = require("express")
const Router = express.Router()
const db = require("../Database/userdb")
Router.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

Router.post("/", (req, res) => {

    db({
        userfirstname: req.body.userfirstname,
        userlastname: req.body.userlastname,
        username: req.body.username,
        password: req.body.password,
    }).save().then((data) => {
        console.log(data);
        res.redirect("/login")
    }).catch((err) => {
        console.log(err);
        res.redirect("/")
    })

})


Router.get("/index.css", (req, res) => {
    res.sendFile(`${__dirname}/index.css`)
})

module.exports = Router
