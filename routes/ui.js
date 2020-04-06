const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // Home page
  // Warning: avoid creating more routes in this file!
  // Separate them into separate routes files (see above).
  router.get("/", (req, res) => {
    res.render("index");
  });

  // EVENT ROUTER TO RENDER EVENT PAGE - TEST - BY LUANA
  router.get("/event", (req, res) => {
    res.render("event");
  });

  router.get("/createEvent", (req, res) => {
    res.render("createEvent");
  })

  return router;
}
