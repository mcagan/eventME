const express = require('express');
const router  = express.Router();

//Fullcalendar setup
const { Calendar } = require('@fullcalendar/core');
const dayGridPlugin = require('@fullcalendar/daygrid');
const timeGridPlugin = require('@fullcalendar/timegrid');
const interaction = require('@fullcalendar/interaction');

module.exports = (db) => {
  router.get("/createEvent", (req, res) => {
   res.render("createEvent")
  });
  return router;
};
