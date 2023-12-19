const mysql = require("mysql2");
const express = require("express");
const session = require('express-session');
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
const db = mysql.createConnection({
    host: "sql12.freesqldatabase.com",
    user: "sql12670908",
    password: "HfsuyHCj65",
    database: "sql12670908"
});

db.connect((err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Connected to database Gym");
    }
});

app.use(
    session({
        secret: 'Reiden',
        resave: false,
        saveUninitialized: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/signup", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var age = req.body.age;
    var gender = req.body.gender;
    var phone = req.body.phone;
    var batchTime = req.body.batch_time;
    var startDate = req.body.start_date;
    var password = req.body.password;
    console.log(startDate)
    console.log(batchTime)
    console.log(gender)
    if (age < 18 || age > 65) {
        res.status(400).json({ status: false, message: "Age must be between 18 and 65." });
        return;
    }

    const query = `
    INSERT INTO user (user_name, user_email, user_age, user_gender, user_phone, user_batch_time, user_start_date, user_password, fee_status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [name, email, age, gender, phone, batchTime, startDate, password, true], (err, result) => {
        if (err) {
            res.status(400).json({ status: false, message: err });
        } else {
            const user = {
                user_id: result.insertId,
                user_name: name,
                user_email: email,
                user_age: age,
                user_gender: gender,
                user_phone: phone,
                user_batch_time: batchTime,
                user_start_date: startDate,
                user_password: password
            };
            res.status(200).json({ status: true, user });
        }
    });
});


app.post("/login", (req, res) => {
    const email = req.body.user_email;
    const password = req.body.user_password;

    const getUserQuery = "SELECT * FROM user WHERE user_email=?";
    db.query(getUserQuery, [email], (err, result) => {
        if (err) {
            console.error(err);
            res.status(400).json({ status: false, message: err });
        } else {
            if (result.length > 0) {
                const user = result[0];
                console.log(user);
                const updateQuery = `
                    UPDATE user 
                    SET fee_status = IF(DATEDIFF(CURDATE(), user_start_date) >= 30, 0, fee_status)
                    WHERE user_id = ?
                `;

                db.query(
                    updateQuery,
                    [user.user_id],
                    (updateErr, updateResult) => {
                        if (updateErr) {
                            console.error(updateErr);
                            res.status(500).json({ status: false, message: "Failed to update user details." });
                        } else {
                            const getUpdatedUserQuery = "SELECT * FROM user WHERE user_email=?";
                            db.query(getUpdatedUserQuery, [email], (fetchErr, fetchResult) => {
                                if (fetchErr) {
                                    console.error(fetchErr);
                                    res.status(500).json({ status: false, message: "Failed to fetch updated user details." });
                                } else {
                                    const updatedUser = fetchResult[0];
                                    console.log(updatedUser);

                                    if (updatedUser.fee_status === false) {
                                        res.status(200).json({ status: true, paymentRequired: true, ...updatedUser });
                                    } else {
                                        res.status(200).json({ status: true, paymentRequired: false, ...updatedUser });
                                    }
                                }
                            });
                        }
                    }
                );
            } else {
                res.status(400).json({ status: false, message: "Enter Correct details!!" });
            }
        }
    });
});





app.put("/updateBatchTime", (req, res) => {
    const userId = req.body.user_id;
    const newBatchTime = req.body.user_batch_time;

    const updateQuery = `
      UPDATE user 
      SET user_start_date = CURDATE(), user_batch_time = ?, fee_status = 1
      WHERE user_id = ?
    `;

    db.query(updateQuery, [newBatchTime, userId], (err, result) => {
        if (err) {
            res.status(500).json({ status: false, message: "Failed to update user start date, batch time, and fee status." });
        } else {
            if (result.affectedRows > 0) {
                res.status(200).json({ status: true, message: "User start date, batch time, and fee status updated successfully." });
            } else {
                res.status(404).json({ status: false, message: "User not found." });
            }
        }
    });
});




  

app.get("/user-details", (req, res) => {
    const userId = req.body.user_id;
    console.log(userId)
    const fetchUserEntriesQuery = `
      SELECT * FROM user 
      WHERE user_id = ?
    `;
  
    db.query(fetchUserEntriesQuery, [userId], (err, result) => {
      if (err) {
        res.status(500).json({ status: false, message: "Failed to fetch user entries." });
      } else {
        if (result.length > 0) {
          res.status(200).json({ status: true, result });
        } else {
          res.status(404).json({ status: false, message: "User not found." });
        }
      }
    });
  });
  


app.listen(8000, () => {
    console.log("running server");
});
