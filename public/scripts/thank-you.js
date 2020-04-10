$(document).ready(() => {
  // FUNCTION DEALS WITH THE GET REQUEST OF SAVED EVENTS RENDERING TO TIMELINE
  const requestDates = (url) => {
    // issue the request with jQuery Ajax
    $.ajax({
      method: "GET",
      url,
    })
      .done(function (result) {
        // Success. Getting the result from the request
        // the return element need to be appended to the existing html
        console.log(result);
        renderListOfDates(result);
      })
      .fail(function (error) {
        // Problem with the request
        console.log(`Error with the request: ${error.message}`);
      })
      .always(function () {
        // This will always run
        console.log("request completed");
      });
  };
});
