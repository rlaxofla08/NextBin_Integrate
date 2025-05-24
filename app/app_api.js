const express = require("express");
//const bodyParser = require("body-parser");
//const session = require("express-session");
const path = require("path");

const app = express();
const port = 3010;
// CORS 설정
app.use();




app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/main.html"));
});

app.listen(port, () => {
    console.log(`SERVER START ON PORT : ${port}`);
});

