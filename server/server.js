const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const sessionConfig = require("./config/sessionConfig");
const apiRoutes = require('./routes/api'); //라우터로 코드 분리
const authRoutes = require('./routes/auth'); //라우터로 코드 분리
const cors = require("cors"); // CORS 미들웨어 추가
const path = require("path");
const https = require('https');
const fs = require("fs");

const app = express();
const port = 3005;

// CORS 설정
app.use(cors({
    credentials: true // 쿠키와 인증 정보를 포함한 요청을 허용
}));

app.use(express.static(path.join(__dirname ,"/public"))); // 정적 파일 제공
app.use(bodyParser.json());
app.use(session(sessionConfig));
app.use(bodyParser.urlencoded({ extended: true }));

//라우터 설정
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

https.createServer({
  key: fs.readFileSync('./ssl/key.pem'),
  cert: fs.readFileSync('./ssl/cert.pem')
}, app).listen(port, () => {
  console.log('nextbin테스트');
});
