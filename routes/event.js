const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // EVENT ROUTER TO RENDER EVENT PAGE - TEST - BY LUANA
  router.get("/event/:id", (req, res) => {
    const ajax = req.query.ajax;
    // console.log('check this', req.params);
    db.query(`
      SELECT events.title, users.name, events.location, dates.date, COUNT(votes.id) AS vote_count
      FROM events
      JOIN users ON events.user_id = users.id
      JOIN dates ON dates.event_id = events.id
      JOIN votes ON votes.event_id = events.id AND votes.user_id = events.user_id
      GROUP BY events.id, dates.id, users.name
      HAVING events.id = $1;
      `, [req.params.id])
      .then(data => {
        let event = data.rows[0];
        event.id = req.params.id;
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
