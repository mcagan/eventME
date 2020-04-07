/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// THIS FUNCTION WILL CREATE THE HTML ELEMENTS FOR A NEW EVENT
const createListOfDates = function (listObj) {
  console.log("DATE", listObj.date);

  let $ulcontainAllList = $("ul.dates_list");
  let $liListRow = $("<li>").addClass("date_list_row");
  let $divDate = $("<div>").addClass("date_option");
  $("<div>")
    .addClass("d-month")
    .text(moment(listObj.date).format("MMM"))
    .appendTo($divDate);
  $("<div>")
    .addClass("d-date")
    .text(moment(listObj.date).format("Do"))
    .appendTo($divDate);
  $("<div>")
    .addClass("d-day")
    .text(moment(listObj.date).format("ddd"))
    .appendTo($divDate);
  let $divVoteCounter = $("<div>").addClass("vote_counter");
  $("<p>").text(listObj.vote).text(" votes").appendTo($divVoteCounter);
  let $inputCheckBox = $("<input>")
    .attr("type", "checkbox")
    .attr("id", "poll_checkbox")
    .attr("name", "to-be-decided")
    .attr("value", "to-be-decided");

  $divDate.appendTo($liListRow);
  $divVoteCounter.appendTo($liListRow);
  $inputCheckBox.appendTo($liListRow);
  $liListRow.appendTo($ulcontainAllList);

  // return final tweet element
  return $ulcontainAllList;
};

// FUNCTION TO RENDER EVENTS COMMING FROM DATABASE?!
const renderListOfDates = function (ListOfDates) {
  // loops through dates
  // calls createListOfDates for each date list
  // takes return value and appends it to the list < ul >
  $(".dates_list").empty();

  $.each(ListOfDates, function (index, listObj) {
    console.log("listObj", listObj);
    $(".dates_list").append(createListOfDates(listObj));
  });
};

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

//////////////////////////////////////////////////////////////////////
/// DO I NEED TO CREATE A POST REQUEST FOR THE VOTES? I THINK YES ///
////////////////////////////////////////////////////////////////////

// WHEN DOCUMENT IS READY DO THE FOLLOWING
$(document).ready(function () {
  // Reading the id of the event comming from .main-wrapper that has data-id = event.id in the HTML
  const eventId = $(".main-wrapper").data("id");

  // ?ajax=true -> means that we want to get json data back from the backend route (otherwise we get full HTML)
  requestDates(`/event/${eventId}?ajax=true`);
});
