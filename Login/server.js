const express = require("express")
const Router = express.Router()
const db = require("../Database/userdb")

Router.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})


Router.post("/", (req, res) => {


    db.findOne({
        username: req.body.username,
        password: req.body.password
    }).then((data) => {
        console.log(data);

        if (data == null || undefined || "") {
            res.redirect("/")
        }

        if (data != null || undefined) {
            var userinfo = {
                username: data.username,
                password: data.password
            }
            res.cookie("userinfo", userinfo, { maxAge: 10000000 })
            res.redirect("/calculator")


        }

    }).catch((err) => {
        console.log(err);
        res.redirect("/login")
    })

})


module.exports = Router