const express = require("express");
const app = express();
const userdata  = require('./USER_DETAILS.json')

app.get("/USER_DETAILS", (req, resq) => {
    resq.send({
        userdata
    })
})
app.listen(5000, () => {
    console.log("app is running")
})
module.exports = app;
