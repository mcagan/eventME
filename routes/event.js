const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // EVENT ROUTER TO RENDER EVENT PAGE - TEST - BY LUANA
  router.get("/event/:id", (req, res) => {
    db.query(
      `
      SELECT *
      FROM events
      JOIN users ON user_id = users.id
      WHERE events.id = $1;
      `,
      [req.params.id]
    )
      .then((data) => {
        const event = data.rows[0];
        console.log(event);
        res.render("event", { event });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/createEvent", (req, res) => {
    res.render("createEvent");
  });

  return router;
};
