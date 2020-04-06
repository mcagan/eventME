// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

//Fullcalendar setup
const { Calendar } = require('@fullcalendar/core');
const dayGridPlugin = require('@fullcalendar/daygrid');
const timeGridPlugin = require('@fullcalendar/timegrid');
const interaction = require('@fullcalendar/interaction')

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
// const createEvent = require("./routes/createEvent");
const widgetsRoutes = require("./routes/widgets");
// routes for all UI - event / index / create event
const uiRoutes = require("./routes/ui");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// app.use("/createEvent", createEvent(db));
app.use("/api/widgets", widgetsRoutes(db));
// routes for all UI - event / index / create event
app.use("/", uiRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/createEvent", (req, res) => {
  // $(document).ready(function() {
  //   $('#calendar').fullCalendar({
  //     header: {
  //       left: 'prev,next today',
  //       center: 'title',
  //       right: 'month,basicWeek,basicDay'
  //     },
  //   plugins: [ timeGridPlugin, interaction ],
  //   defaultView: 'resourceTimeGridDay',
  //   selectable: true,
  //   header: {
  //     left: 'prev,next today',
  //     center: 'title',
  //   },
  //   select: function(info) {
  //     alert('selected ' + info.startStr + ' to ' + info.endStr);
  //     }
  //   });
  // });
  res.render("createEvent")
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
