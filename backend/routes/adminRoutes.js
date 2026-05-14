const express = require("express");

const auth =
  require("../middleware/auth");

const admin =
  require("../middleware/admin");

const db =
  require("../models/db");

const router = express.Router();


// ==========================
// ADMIN DASHBOARD
// ==========================

router.get(
  "/dashboard",
  auth,
  admin,
  (req, res) => {

    res.json({
      msg: "Welcome Admin"
    });

  }
);


// ==========================
// ADMIN STATS
// ==========================

router.get(
  "/stats",
  auth,
  admin,
  (req, res) => {

    // TOTAL RESULTS

    db.query(
      "SELECT COUNT(*) AS totalResults FROM results",

      (err1, result1) => {

        if (err1) {
          return res.status(500).json(err1);
        }

        // TOTAL BEST ATHLETES

        db.query(
          `
          SELECT COUNT(*) AS totalBest
          FROM results
          WHERE isBest = true
          `,

          (err2, result2) => {

            if (err2) {
              return res.status(500).json(err2);
            }

            res.json({

              totalResults:
                result1[0].totalResults,

              totalBest:
                result2[0].totalBest,

              upcomingEvents: 3

            });

          }
        );

      }
    );

  }
);

module.exports = router;