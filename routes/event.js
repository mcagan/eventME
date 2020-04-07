const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // EVENT ROUTER TO RENDER EVENT PAGE - TEST - BY LUANA
  router.get("/event/:id", (req, res) => {
    const ajax = req.query.ajax;
    db.query(`
      SELECT events.title, users.name, events.location, dates.date, COUNT(votes.id) AS vote_count
      FROM events
      JOIN users ON user_id = users.id
      JOIN dates ON dates.event_id = events.id
      JOIN votes ON votes.event_id = events.id
      WHERE events.id = $1
      GROUP BY events.id, dates.id;
      `, [req.params.id])
      .then(data => {
        const event = data.rows[0];
        console.log(event);
        if (ajax) {
          res.json({ event });
        } else {
          res.render('event', { event });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/createEvent", (req, res) => {
    res.render("createEvent");
  })

  return router;
}
