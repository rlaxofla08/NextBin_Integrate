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
const markers = [
  { title: "NextBin 1", lat: 37.5665, lng: 126.9780 },
  { title: "NextBin 2", lat: 37.5685, lng: 126.9770 }
];

app.get('/api/markers', (req, res) => {
  res.json(markers);
});
//라우터 설정
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`SERVER START ON PORT : ${port}`);
});
