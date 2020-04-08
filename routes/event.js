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

  router.post("/events", (req, res) => {
    // const queryText =
    // "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id;";
    // const values = [data.name, data.email];
    // return pool
    // .query(queryText, values)
    // .then((res) => addEvent(data, Number(res.rows[0]).then((res) => ))
    // .catch((err) => console.log("Err", err));
    console.log("test");
    console.log(req.body);
  });
  return router;
};
