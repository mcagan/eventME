//extract information from the form
//extract the schedule from the calendar
//create an output object that contains the information
//ajax request post to /events => send the output object along
//on the backend side receive this object available through req.body

//helper function to create an object from the form input
function objectifyForm(formArray) {
  var returnArray = {};
  for (var i = 0; i < formArray.length; i++) {
    returnArray[formArray[i]["name"]] = formArray[i]["value"];
  }
  return returnArray;
}

$(document).ready(() => {
  // let userEvents = [];
  // window.userEvents = userEvents;
  $("#event-submit-button").click(function (event) {
    event.preventDefault();
    const array = $("#event-submit").serializeArray();
    let values = objectifyForm(array);
    values.events = userEvents;
    $.ajax({ type: "POST", url: "/events", data: values })
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
