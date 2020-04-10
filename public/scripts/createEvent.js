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
        window.location.replace(result.url);
      })
      .fail(function (error) {
        // Problem with the request
        //console.log(`Error with the request: ${error.message}`);
        console.log(error);
      })
      .always(function () {
        // This will always run
        console.log("request completed");
      });
  });
});
