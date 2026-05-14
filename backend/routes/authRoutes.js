const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../models/db");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!email.endsWith("@iiserkol.ac.in")) {
    return res.status(400).json({
      msg: "Use college email"
    });
  }

  const hashed = await bcrypt.hash(password, 10);

  const sql =
    "INSERT INTO users (name,email,password) VALUES (?,?,?)";

  db.query(sql, [name, email, hashed], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      msg: "User registered"
    });
  });
});

module.exports = router;
const jwt = require("jsonwebtoken");

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (results.length === 0) {
      return res.status(400).json({
        msg: "User not found"
      });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        msg: "Wrong password"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.json({
      msg: "Login successful",
      token,
      role:user.role
    });
  });
});