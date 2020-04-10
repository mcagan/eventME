const express = require("express");
const router = express.Router();

////////// FUNCTION TO CREATE TIMESLOT STRUCTURE IN DB //////////////
const createNewTimeSlot = (timeslot) => {
  const newTimeSlot = {
    date_id: timeslot.date_id,
    start_date: timeslot.start_date,
    end_date: timeslot.end_date,
    users: [
      {
        user_id: timeslot.user_id,
        name: timeslot.name,
        email: timeslot.email,
        vote_id: timeslot.vote_id,
        yes_no: timeslot.yes_no,
      },
    ],
  };
  return newTimeSlot;
};

const addUserToTimeSlot = (usersArr, timeslot) => {
  usersArr.push({
    user_id: timeslot.user_id,
    name: timeslot.name,
    email: timeslot.email,
    vote_id: timeslot.vote_id,
    yes_no: timeslot.yes_no,
  });
};

const addTimeslots = (timeslotsArr) => {
  const timeslots = {};

  for (let timeslot of timeslotsArr) {
    if (!timeslots[timeslot.date_id]) {
      timeslots[timeslot.date_id] = createNewTimeSlot(timeslot);
    } else {
      addUserToTimeSlot(timeslots[timeslot.date_id].users, timeslot);
    }
  }

  // COUNTING THE VOTES
  return Object.values(timeslots).map((timeslot) => {
    timeslot.vote_count = timeslot.users.filter(
      (user) => user.yes_no === true
    ).length;

    return timeslot;
  });
};

module.exports = (db) => {
  const getIdfromURL = function (url) {
    console.log("URL:", url);
    const queryText = "SELECT id FROM events WHERE url = $1;";
    const values = [url];
    return db
      .query(queryText, values)
      .then((result) => {
        console.log("getidFromURL ID", result.rows);
        return result.rows[0];
      })
      .catch((err) => console.log("Err", err));
  };
  // EVENT ROUTER TO RENDER EVENT PAGE
  router.get("/event/:url", (req, res) => {
    const ajax = req.query.ajax;
    // QUERY TO SELECT CERTAIN INSTANCES TO DISPLAY DATES ONLY
    // const id =
    getIdfromURL(req.params.url).then(({ id }) => {
      console.log("id", id);

      const queryEvent = {
        text: `SELECT events.id as event_id, events.title, events.location, events.url, users.id as user_id, users.name, users.email
      FROM events JOIN users ON events.user_id = users.id
      WHERE events.id = $1`,
        values: [id],
      };
      const getInitialEventContent = db.query(queryEvent);

      const queryTimeslots = {
        text: `SELECT dates.id as date_id, start_date, end_date, users.name, users.email, votes.id as vote_id, votes.user_id as user_id, votes.yes_no
      FROM dates LEFT JOIN votes ON votes.date_id = dates.id LEFT JOIN users ON votes.user_id = users.id
      WHERE dates.event_id = $1`,
        values: [id],
      };

      // JOIN votes ON votes.date_id = dates.id JOIN users ON votes.user_id = users.id
      const getTimeSlots = db.query(queryTimeslots);

      Promise.all([getInitialEventContent, getTimeSlots])
        .then((data) => {
          const event = data[0].rows;
          console.log("timeslots", data[1].rows);

          const timeslotsResult = data[1].rows;

          event[0].timeslots = addTimeslots(timeslotsResult);

          //console.log(event);
          console.log(JSON.stringify(event, null, 2));

          if (ajax) {
            res.json({ event });
          } else {
            res.render("event", { event });
          }
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
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

  //Add event to database from form
  const addEvent = function (data, user_id) {
    const queryText =
      "INSERT INTO events (title, URL, description, location, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING events.id AS id;";
    const URL = generateUniqueURL(10);
    const values = [data.title, URL, data.description, data.location, user_id];
    return db.query(queryText, values).catch((err) => console.log("Err", err));
  };

  //Add event dates to database from form
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

  //Add poll votes to database from form
  const addVote = function (data, event_id, user_id) {
    const queryText =
      "INSERT INTO votes (user_id, event_id, date_id, yes_no) VALUES ($1, $2, $3, true)";
    console.log("data", data);
    let promisesArray = [];
    for (let date of data) {
      let values = [user_id, event_id, Number(date)];
      console.log(values);
      const promise = db
        .query(queryText, values)
        .then((res) => res.rows)
        .catch((err) => console.log("Err", err));
      promisesArray.push(promise);
    }
    return Promise.all(promisesArray);
  };
  //Get event unique url using title from form
  const getURLfromTitle = function (title) {
    const queryText = "SELECT url FROM events WHERE title = $1;";
    const values = [title];
    return db.query(queryText, values).catch((err) => console.log("Err", err));
  };

  router.post("/events", (req, res) => {
    const queryText =
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id;";
    const values = [req.body.name, req.body.email];
    const title = req.body.title;
    db.query(queryText, values)
      .then((dbres) =>
        addEvent(req.body, Number(dbres.rows[0].id))
          .then((dbres) => addDate(req.body, Number(dbres.rows[0].id)))
          .then(() => getURLfromTitle(title))
          .then((dbres) => {
            const redirectURL = `/event/${dbres.rows[0].url}`;
            res.json({ url: redirectURL });
          })
      )
      .catch((err) => console.log("Err", err));
  });

  router.post("/votes", (req, res) => {
    const queryText =
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id;";
    const values = [req.body.name, req.body.email];
    let event_id = Number(req.body.event_id);
    console.log(event_id);
    return db
      .query(queryText, values)
      .then((dbres) =>
        addVote(req.body.dates, event_id, Number(dbres.rows[0].id)).then(() => {
          res.json({ status: true });
        })
      )
      .catch((err) => console.log("Err", err));
  });
  return router;
};
