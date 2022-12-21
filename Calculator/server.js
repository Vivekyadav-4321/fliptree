const express = require("express")
const Router = express.Router()
const db = require("../Database/userdb")

Router.get("/", (req, res) => {

    console.log(req.cookies);

    db.findOne({
        username: (req.cookies).userinfo.username,
        password: (req.cookies).userinfo.password
    }).then((data) => {
        if (data == null || undefined || "") {
            res.redirect("/login")
        }
        if (data != null || undefined || "") {
            var usernmae = `${data.userfirstname} ${data.userlastname}`
            var alltransactions = String()

            var balance = Number()
            for (let i = 0; i < data.expenses.length; i++) {
                balance = Number(balance) + Number(data.expenses[i].amount)
            }
            for (let i = 0; i < data.expenses.length; i++) {
                alltransactions = alltransactions + `
                <div class="expenseconatiner">
                <h1 class="expenseheading">${data.expenses[i].heading}</h1>
                <p class="expensedesscription">Description: ${data.expenses[i].description}</p>
                <p class="expenseamount">Amount: <span class="${data.expenses[i].transactiontype}">${data.expenses[i].amount}</span></p>
                <p class="expensedate"> Date: ${data.expenses[i].date}</p>
                <p class="Transactiontype"> Type: ${data.expenses[i].transactiontype} </p>
            </div>
                `
            }

            var totalexpense = 0
            for (let j = 0; j < data.expenses.lengthl; j++) {
                totalexpense = totalexpense + data.expenses[j].amount
            }

            res.render(`${__dirname}/index.hbs`, {
                usernmae,
                alltransactions,
                totalexpense,
                balance
            })

        }
    })
        .catch((err) => {
            console.log(err);
            res.redirect("/login")
        })

})


Router.post("/", (req, res) => {

    var totalanount = (type, amount) => {
        if (type == "credit") {
            return amount
        }
        if (type == "debit") {
            return -amount
        }

    }

    db.findOne({
        username: req.cookies.userinfo.username,
        password: req.cookies.userinfo.password
    }).then((data) => {
        db.updateOne({
            _id: data._id.toString()
        }, {
            $push: {
                expenses: {
                    heading: req.body.heading,
                    description: req.body.description,
                    amount: totalanount(req.body.transactiontype, req.body.amount),
                    date: req.body.date,
                    transactiontype: req.body.transactiontype
                }
            }
        }).then((data) => {
            console.log(data);

            res.redirect("/calculator")
        })
            .catch((err) => {
                console.log(err);
                res.redirect("/calculator")
            })

    }).catch((err) => {
        console.log(err)
    })

})

Router.get("/index.css", (req, res) => {
    res.sendFile(`${__dirname}/index.css`)
})




module.exports = Router