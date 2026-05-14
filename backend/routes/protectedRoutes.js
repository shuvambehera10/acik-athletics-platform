const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/profile", auth, (req, res) => {

  res.json({
    msg: "Protected route accessed",
    user: req.user
  });

});

module.exports = router;