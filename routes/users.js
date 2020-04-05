/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // EVENT ROUTER TO RENDER EVENT PAGE - TEST - BY LUANA
  // this is not working in here, i will figure it out monday
  // just as a temporary measure i will have this route on server.js
  router.get("/event", (req, res) => {

    res.render("event");
  });

  return router;
};
