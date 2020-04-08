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

  //Generates random string for uniqueURL
  const generateUniqueURL = (num) => {
    let result = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < num; i++) {
      result += chars.charAt(Math.floor(Math.random() * 62));
    }
    return result;
  };

  const addEvent = function (data, user_id) {
    const queryText =
      "INSERT INTO events (title, URL, description, location, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING events.id AS id;";
    const URL = generateUniqueURL(10);
    const values = [data.title, URL, data.description, data.location, user_id];
    return db.query(queryText, values).catch((err) => console.log("Err", err));
  };

  const addDate = function (data, event_id) {
    const queryText =
      "INSERT INTO dates (start_date, end_date, allDay, event_id) VALUES ($1, $2, $3, $4)";
    for (let date of data.events) {
      let start = new Date(date.start);
      let end = new Date(date.end);
      let values = [start, end, date.allDay, event_id];
      db.query(queryText, values)
        .then((res) => res.rows)
        .catch((err) => console.log("Err", err));
    }
  };

  router.post("/events", (req, res) => {
    const queryText =
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id;";
    const values = [req.body.name, req.body.email];
    return db
      .query(queryText, values)
      .then((dbres) =>
        addEvent(req.body, Number(dbres.rows[0].id))
          .then((dbres) => addDate(req.body, Number(dbres.rows[0].id)))
          .then(() => res.json("ok"))
      )
      .catch((err) => console.log("Err", err));
  });
  return router;
};
