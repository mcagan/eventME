//Generates random string for uniqueURL
const generateUniqueURL = (num) => {
  let result = "";
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < num; i++) {
    result += chars.charAt(Math.floor(Math.random() * 62));
  }
  return result;
};
module.exports = { generateUniqueURL };

$(document).ready(() => {
  $("#submit").submit(function (event) {
    event.preventDefault();
    let outputObj = {};
    outputObj.title = event.text[0];
    outputObj.description = event.text[1];
    outputObj.location = event.text[2];
    outputObj.name = event.text[3];
    outputObj.email = event.text[4];
    outputObj.events = events;
    date = outputObj.serialize();
    $.ajax({ method: "POST", url: "/events", data })
      .done(function (result) {
        return result;
      })
      .fail(function (error) {
        // Problem with the request
        console.log(`Error with the request: ${error.message}`);
      })
      .always(function () {
        // This will always run
        console.log("request completed");
      });
  });
});

//extract information from the form
//extract the schedule from the calendar through the calendar variable
//create an output object that contains the information
//ajax request post to /events => send the output object along
//on the backend side receive this object available through req.body

// const addEvent = function (data, user) {
//   const queryText =
//     "INSERT INTO events (title, URL, description, location, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
//   const URL = generateUniqueURL(10);
//   const values = [data.title, URL, data.description, data.location, user.id];
//   return pool
//     .query(queryText, values)
//     .then((res) => res.rows)
//     .catch((err) => console.log("Err", err));
// };
// exports.addEvent = addEvent;

// const addUser = function (data) {
//   const queryText =
//     "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id;";
//   const values = [data.name, data.email];
//   return pool
//     .query(queryText, values)
//     .then((res) => addEvent(data, Number(res.rows[0]).then((res) => ))
//     .catch((err) => console.log("Err", err));
// };
// exports.addUser = addUser;

// const addDate = function (calendar) {};
