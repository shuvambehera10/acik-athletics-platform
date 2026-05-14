const express = require("express");

const router = express.Router();

const db = require("../models/db");

const auth = require("../middleware/auth");

const admin = require("../middleware/admin");

const ipRestriction =
  require("../middleware/ipRestriction");

const upload =
  require("../middleware/upload");


// =====================================
// ADD RESULT WITH PHOTO
// =====================================

router.post(

  "/add-with-photo",

  auth,

  admin,

  upload.single("photo"),

  (req, res) => {

    try {

      console.log(req.body);

      console.log(req.file);

      const {
        athlete_name,
        event_name,
        position,
        performance,
        isBest,
      } = req.body;

      const photo_url = req.file
        ? `/uploads/${req.file.filename}`
        : null;

      const sql = `
        INSERT INTO results
        (
          athlete_name,
          event_name,
          position,
          performance,
          isBest,
          photo_url
        )
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      db.query(

        sql,

        [
          athlete_name,
          event_name,
          position,
          performance,
          isBest === "true",
          photo_url,
        ],

        (err, result) => {

          if (err) {

            console.log(err);

            return res.status(500).json({
              msg: "Database error",
              error: err,
            });
          }

          res.json({
            msg: "Result uploaded successfully",
          });
        }
      );

    } catch (err) {

      console.log(err);

      res.status(500).json({
        msg: "Server error",
        error: err,
      });
    }
  }
);


// =====================================
// GET ALL RESULTS
// =====================================

router.get(

  "/",

  auth,

  (req, res) => {

    const sql =
      "SELECT * FROM results ORDER BY id DESC";

    db.query(sql, (err, results) => {

      if (err) {

        console.log(err);

        return res.status(500).json(err);
      }

      res.json(results);
    });
  }
);


// =====================================
// GET BEST ATHLETES
// =====================================

router.get(

  "/best",

  auth,

  ipRestriction,

  (req, res) => {

    const sql =
      "SELECT * FROM results WHERE isBest = true";

    db.query(sql, (err, results) => {

      if (err) {

        console.log(err);

        return res.status(500).json(err);
      }

      res.json(results);
    });
  }
);

router.get(
  "/homepage",

  (req, res) => {

    const sql =
      "SELECT * FROM homepage_content LIMIT 1";

    db.query(sql, (err, results) => {

      if (err) {

        return res.status(500).json(err);
      }

      res.json(results[0]);

    });
  }
);

router.put(
  "/homepage",

  auth,

  admin,

  (req, res) => {

    const {
      title,
      subtitle,
      announcement,
    } = req.body;

    const sql = `
      UPDATE homepage_content

      SET
        title = ?,
        subtitle = ?,
        announcement = ?

      WHERE id = 1
    `;

    db.query(

      sql,

      [
        title,
        subtitle,
        announcement,
      ],

      (err, result) => {

        if (err) {

          return res.status(500).json(err);
        }

        res.json({
          msg: "Homepage updated",
        });
      }
    );
  }
);

router.get(
  "/users",

  auth,

  admin,

  (req, res) => {

    const sql =
      "SELECT id, name, email, role FROM users";

    db.query(sql, (err, results) => {

      if (err) {

        return res.status(500).json(err);
      }

      res.json(results);

    });
  }
);

router.put(
  "/make-admin/:id",

  auth,

  admin,

  (req, res) => {

    const { id } = req.params;

    const sql = `
      UPDATE users
      SET role = 'admin'
      WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

      if (err) {

        return res.status(500).json(err);
      }

      res.json({
        msg: "User promoted to admin",
      });

    });
  }
);

router.put(
  "/remove-admin/:id",

  auth,

  admin,

  (req, res) => {

    const { id } = req.params;

    const sql = `
      UPDATE users
      SET role = 'student'
      WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

      if (err) {

        return res.status(500).json(err);
      }

      res.json({
        msg: "Admin removed",
      });

    });
  }
);

router.post(
  "/events",

  auth,

  admin,

  (req, res) => {

    const {

      title,

      description,

      location,

      event_date,

      event_time,

      category,

    } = req.body;

    const sql = `
      INSERT INTO events

      (
        title,
        description,
        location,
        event_date,
        event_time,
        category
      )

      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(

      sql,

      [
        title,
        description,
        location,
        event_date,
        event_time,
        category,
      ],

      (err, result) => {

        if (err) {

          return res.status(500).json(err);
        }

        res.json({
          msg: "Event added",
        });
      }
    );
  }
);

router.get(
  "/events",

  (req, res) => {

    const sql = `
      SELECT *
      FROM events
      ORDER BY event_date ASC
    `;

    db.query(sql, (err, results) => {

      if (err) {

        return res.status(500).json(err);
      }

      res.json(results);

    });
  }
);

router.put(
  "/events/:id",

  auth,

  admin,

  (req, res) => {

    const { id } = req.params;

    const {

      title,

      description,

      location,

      event_date,

      event_time,

      category,

    } = req.body;

    const sql = `
      UPDATE events

      SET

        title = ?,
        description = ?,
        location = ?,
        event_date = ?,
        event_time = ?,
        category = ?

      WHERE id = ?
    `;

    db.query(

      sql,

      [

        title,

        description,

        location,

        event_date,

        event_time,

        category,

        id,
      ],

      (err, result) => {

        if (err) {

          return res.status(500).json(err);
        }

        res.json({
          msg: "Event updated",
        });

      }
    );
  }
);

router.delete(
  "/events/:id",

  auth,

  admin,

  (req, res) => {

    const { id } = req.params;

    const sql = `
      DELETE FROM events
      WHERE id = ?
    `;

    db.query(sql, [id],

      (err, result) => {

        if (err) {

          return res.status(500).json(err);
        }

        res.json({
          msg: "Event deleted",
        });

      }
    );
  }
);

router.post(
  "/announcements",

  auth,

  admin,

  (req, res) => {

    const {
      title,
      message,
    } = req.body;

    const sql = `
      INSERT INTO announcements
      (
        title,
        message
      )

      VALUES (?, ?)
    `;

    db.query(

      sql,

      [title, message],

      (err, result) => {

        if (err) {

          return res.status(500).json(err);
        }

        res.json({
          msg: "Announcement added",
        });

      }
    );
  }
);

router.get(
  "/announcements",

  (req, res) => {

    const sql = `
      SELECT *
      FROM announcements
      ORDER BY created_at DESC
    `;

    db.query(sql, (err, results) => {

      if (err) {

        return res.status(500).json(err);
      }

      res.json(results);

    });
  }
);

router.post(
  "/rankings",

  auth,

  admin,

  (req, res) => {

    const {

      athlete_name,

      event_name,

      gold_medals,

      silver_medals,

      bronze_medals,

      total_points,

      ranking_position,

    } = req.body;

    const sql = `
      INSERT INTO rankings

      (
        athlete_name,
        event_name,
        gold_medals,
        silver_medals,
        bronze_medals,
        total_points,
        ranking_position
      )

      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(

      sql,

      [
        athlete_name,
        event_name,
        gold_medals,
        silver_medals,
        bronze_medals,
        total_points,
        ranking_position,
      ],

      (err, result) => {

        if (err) {

          return res.status(500).json(err);
        }

        res.json({
          msg: "Ranking added",
        });

      }
    );
  }
);

router.get(
  "/rankings",

  (req, res) => {

    const sql = `
      SELECT *
      FROM rankings
      ORDER BY ranking_position ASC
    `;

    db.query(sql, (err, results) => {

      if (err) {

        return res.status(500).json(err);
      }

      res.json(results);

    });
  }
);

router.put(
  "/rankings/:id",

  auth,

  admin,

  (req, res) => {

    const { id } = req.params;

    const {

      gold_medals,

      silver_medals,

      bronze_medals,

      total_points,

      ranking_position,

    } = req.body;

    const sql = `
      UPDATE rankings

      SET

        gold_medals = ?,
        silver_medals = ?,
        bronze_medals = ?,
        total_points = ?,
        ranking_position = ?

      WHERE id = ?
    `;

    db.query(

      sql,

      [

        gold_medals,

        silver_medals,

        bronze_medals,

        total_points,

        ranking_position,

        id,
      ],

      (err, result) => {

        if (err) {

          return res.status(500).json(err);
        }

        res.json({
          msg: "Ranking updated",
        });

      }
    );
  }
);

router.delete(
  "/:id",

  auth,

  admin,

  (req, res) => {

    const { id } = req.params;

    const sql =
      "DELETE FROM results WHERE id = ?";

    db.query(sql, [id], (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        msg: "Result deleted",
      });
    });
  }
);

module.exports = router;