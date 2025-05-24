const express = require("express");
const router = express.Router();
const dbConnect = require("../modules/db");
const authenticateSession = require("../modules/authSession");



// 기기 정보 조회 (로그인 확인후 조회가능)
router.post("/device_info", authenticateSession, (req, res) => {
  const { device_id } = req.body;//@ : email
  const id = req.session.user.id;
  if (!device_id || typeof device_id !== 'number') {
    return res.status(400).send({ success: false, message: "Invalid device ID", status: 400 });
  }
  dbConnect((err, db) => {
    if (err) {
      return res.status(500).send({ success: false, message: "Database Error", status: 500 });
    }

    const query = "SELECT * FROM Users WHERE session_id = ?";
    db.get(query, [id], (err, row) => {
      if (err) {
        db.close();
        return res.status(500).send({ success: false, message: "Database Error", status: 500 });
      }
      if (!row) {
        db.close();
        return res.status(401).send({ success: false, message: "로그인 에러", status: 401 });
      }
      const Device_information_query = "SELECT * FROM Device_information";
      db.all(Device_information_query, [], (err, rows) => {
        db.close();
        if (err) {
          return res.status(500).send({ success: false, message: "Database Error", status: 500 });
        }
        if (rows.length === 0) {
          return res.status(404).send({ success: false, message: "No devices found", status: 404 });
        }
        return res.status(200).send({ success: true, data: rows, status: 200 });
      });
    });
  });
});

//기기 추가
router.post("/device_add", authenticateSession, (req, res) => {
  const device_id = req.body.device_id;
  const user_id = req.session.user.id;

  if (!device_id || typeof device_id !== 'number') {
    return res.status(400).send({ success: false, message: "Invalid device ID", status: 400 });
  }

  dbConnect((err, db) => {
    if (err) {
      return res.status(500).send({ success: false, message: "Database Error", status: 500 });
    }

    const query = "SELECT * FROM Users WHERE session_id = ?";
    db.get(query, [user_id], (err, row) => {
      if (err) {
        db.close();
        return res.status(500).send({ success: false, message: "Database Error", status: 500 });
      }
      if (!row) {
        db.close();
        return res.status(401).send({ success: false, message: "로그인 에러", status: 401 });
      }
      const Device_information_query = "SELECT * FROM Device_information";
      db.all(Device_information_query, [], (err, rows) => {
        db.close();
        if (err) {
          return res.status(500).send({ success: false, message: "Database Error", status: 500 });
        }
        if (rows.length === 0) {
          return res.status(404).send({ success: false, message: "No devices found", status: 404 });
        }
        return res.status(200).send({ success: true, data: rows, status: 200 });
      });
    });
  });
})

module.exports = router;