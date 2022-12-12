
const express = require('express')
const bodyParser = require("body-parser");
const StudentRoute = require("../routes/studentRoute")

const port = 8080
// app.use(express.urlencoded());
const app = express()
// Parse JSON bodies (as sent by API clients)
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

app.use("/api/student",StudentRoute)


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   