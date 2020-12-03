const express = require("express");
// const codemiror = require("codemirror");

const app = express();


app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, function () {
    console.log("server started at port 3000");
})