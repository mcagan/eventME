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
  // this is not working in here, i will figure it out monday
  // just as a temporary measure i will have this route on server.js
  router.get("/event", (req, res) => {
    res.render("event");
  });

  return router;
}
