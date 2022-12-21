require('dotenv').config()
const db = require("mongoose")
db.connect(`mongodb+srv://vivekyadav:${process.env.password}@cluster0.h5idow8.mongodb.net/test?retryWrites=true&w=majority`)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.log(err);
    })

const dbschema = new db.Schema({
    userfirstname: {
        type: String,
        required: true
    },
    userlastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    expenses: {
        type: Array
    }


})

const alluserdatabase = db.model("users", dbschema)

module.exports = alluserdatabase