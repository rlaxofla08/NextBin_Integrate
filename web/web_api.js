const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors"); // CORS 미들웨어 추가
const path = require("path");

const app = express();
const port = 3000;

// CORS 설정
app.use(cors({
    credentials: true // 쿠키와 인증 정보를 포함한 요청을 허용
}));

app.use(express.static(path.join(__dirname,"public"))); // 정적 파일 제공
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/pages/index.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname + "/user/login/login.html")); // 로그인 페이지로 리다이렉트
});

app.get("/reset-password", (req, res) => {
  res.sendFile(path.join(__dirname + "/user/reset-password/reset-password.html")); // 로그인 페이지로 리다이렉트
});

app.get("/Certification-number", (req, res) => {
  res.sendFile(path.join(__dirname + "/user/reset-password/Certification-number.html"));
})

app.get("/account-information", (req, res) => {
  res.sendFile(path.join(__dirname + "/user/account-information/account-information.html")); // 로그인 페이지로 리다이렉트
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname + "/user/signup/signup.html")); // 로그인 페이지로 리다이렉트
});

app.get("/user-verification", (req, res) => {
  res.sendFile(path.join(__dirname + "/user/reset-password/user-verification.html")); // 로그인 페이지로 리다이렉트
});

app.listen(port, () => {
    console.log(`SERVER START ON PORT : ${port}`);
});