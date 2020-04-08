const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // EVENT ROUTER TO RENDER EVENT PAGE
  router.get("/event/:id", (req, res) => {
    const ajax = req.query.ajax;
    // QUERY TO SELECT CERTAIN INSTANCES TO DISPLAY DATES ONLY

    const queryEvent = {
      text:
        "SELECT events.id as event_id, events.title, events.location, users.id as user_id, users.name, users.email FROM events JOIN users ON events.user_id = users.id WHERE events.id = $1",
      values: [req.params.id],
    };
    const getInitialEventContent = db.query(queryEvent);

    const queryTimeslots = {
      text:
        "SELECT dates.id as date_id, start_date, end_date, users.name, users.email, votes.id as vote_id, votes.user_id as user_id, votes.yes_no FROM dates JOIN votes ON votes.date_id = dates.id JOIN users ON votes.user_id = users.id WHERE dates.event_id = $1",
      values: [req.params.id],
    };
    const getTimeSlots = db.query(queryTimeslots);

    Promise.all([getInitialEventContent, getTimeSlots]).then((data) => {
      const event = data[0].rows;

      const timeslotsResult = data[1].rows;

      const createNewTimeSlot = (timeslot) => {
        const newTimeSlot = {
          date_id: timeslot.date_id,
          start_date: timeslot.start_date,
          end_date: timeslot.end_date,
          users: [
            {
              user_id: timeslot.user_id,
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

        // Counting the votes
        return Object.values(timeslots).map((timeslot) => {
          timeslot.vote_count = timeslot.users.filter(
            (user) => user.yes_no === true
          ).length;

          return timeslot;
        });
      };

      const result = addTimeslots(timeslotsResult);
      console.log(result);

      // res.json({ timeslotsResult });

      // event.timeslots = [];
      // console.log("EVENT:", event);
    });

    // .query(
    //   `
    // SELECT events.id, events.title, events.location

    // // users.name,
    // // dates.start_date,
    // // dates.end_date

    // FROM events
    // // JOIN users ON events.user_id = users.id
    // // JOIN dates ON dates.event_id = events.id
    // // JOIN votes ON votnpmes.event_id = events.id AND votes.user_id = events.user_id
    // WHERE events.id = $1
    // `,
    //   [req.params.id]
    // )

    // // QUERY TO SELECT NAMES OF USERS THAT VOTE ON AN EVENT
    // const getNamesPerTimeslot = db.query(
    //   `SELECT users.name
    //   FROM dates
    //   JOIN votes ON votes.date_id = dates.id
    //   JOIN users ON votes.user_id = users.id
    //   JOIN events ON dates.event_id = events.id
    //   WHERE event.id = $1`,
    //   [req.params.id]
    // );

    // Promise.all([getInitialEventContent, getNamesPerTimeslot])
    // .then((data) => {
    //   let event = data.rows;
    //   // event.id = req.params.id;
    //   console.log("CHECK THIS HERE", event);

    //   // if (ajax) {
    //   //   res.json({ event });
    //   // } else {
    //   //   res.render("event", { event });
    //   // }
    // })

    // .catch((err) => {
    //   res.status(500).json({ error: err.message });
    // });
  });

  router.get("/createEvent", (req, res) => {
    res.render("createEvent");
  });

  return router;
};

//-------- OTHER SUGGESTED METHODS ---------//
// let timeslot = [];
//         for (let items in event) {
//           for (let eachItem of items) {
//             timeslot.push(event.start_date);
//             timeslot.push(event.end_date);
//           }
//         }
//         event["timeslot"] = timeslot;

// const getNamesPerTimeslot = db
//   .query
//   // Query that list names for each timeslot for a specific event
//   // Name | timeslot_id
//   ();
// Promise.all([getInitialEventContent, getNamesPerTimeslot])
// data[0], data[1]

// event {
//   name:
//   id:
//   ...

//   timeslots: [
//     {start_date, end_date, names:[], count:4}
//     {start_date, end_date}
//     {start_date, end_date}
//     {start_date, end_date}
//     {start_date, end_date}
//     {start_date, end_date}
//   ]
// }
