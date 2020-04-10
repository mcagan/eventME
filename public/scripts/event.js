/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// WHEN DOCUMENT IS READY DO THE FOLLOWING
$(document).ready(function () {
  // FUNCTION WILL CREATE THE DATES IN HTML FOR AN EVENT
  const createListOfDates = function (item) {
    // let $maindivWrapper = $$("divdates_list_container");
    let $ulcontainAllList = $("ul.dates_list");
    let $liListRow = $("<li>")
      .addClass("date_list_row")
      .attr("data-timeslotid", item.date_id);
    let $divDate = $("<div>").addClass("date_option");
    $("<div>")
      .addClass("d-month")
      .text(moment(item.start_date).format("MMM"))
      .appendTo($divDate);
    $("<div>")
      .addClass("d-date")
      .text(moment(item.start_date).format("Do"))
      .appendTo($divDate);
    $("<div>")
      .addClass("d-day")
      .text(moment(item.start_date).format("ddd"))
      .appendTo($divDate);
    $("<div>")
      .addClass("d-time")
      .text(moment(item.start_date).format("h:mm a"))
      .appendTo($divDate);
    $("<div>")
      .addClass("d-time")
      .text(` - ${moment(item.end_date).format("h:mm a")}`)
      .appendTo($divDate);
    let $divVoteCounter = $("<div>").addClass("vote_counter");
    $("<p>").text(`${item.vote_count} vote(s)`).appendTo($divVoteCounter);

    // To append vote names on top of vote count
    let $divNames = $("<div>").addClass("popuptext");
    for (let user of item.users) {
      $("<p>").text(user.name).appendTo($divNames);
    }

    $divNames.prependTo($divVoteCounter);

    let $inputCheckBox = $("<input>")
      .attr("type", "checkbox")
      .attr("id", "poll_checkbox")
      .attr("name", "checkboxname")
      .attr("value", item.date_id);

    $divDate.appendTo($liListRow);
    $divVoteCounter.appendTo($liListRow);
    $inputCheckBox.appendTo($liListRow);
    $liListRow.appendTo($ulcontainAllList);
    // $ulcontainAllList.appendTo($maindivWrapper);

    // return final poll elements
    return $ulcontainAllList;
  };

  // FUNCTION TO RENDER POLL DATES OF EVENTS COMING FROM DB
  const renderListOfDates = function (ListOfDates) {
    // loops through dates
    // calls createListOfDates for each date list
    // takes return value and appends it to the list < ul >
    $(".dates_list").empty();

    $.each(ListOfDates.event, function (index, listObj) {
      $.each(listObj.timeslots, function (index, item) {
        $(".dates_list").append(createListOfDates(item));
      });
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

  //////////////////////////////////////////////////////////////////////
  /// DO I NEED TO CREATE A POST REQUEST FOR THE VOTES? I THINK YES ///
  ////////////////////////////////////////////////////////////////////

  // Reading the id of the event comming from .main-wrapper that has data-id = event.id in the HTML
  const eventURL = $(".main-wrapper").data("url");

  //const eventId = $(".main-wrapper").data("event.event_id");

  // ?ajax=true -> means that we want to get json data back from the backend route (otherwise we get full HTML)
  requestDates(`/event/${eventURL}?ajax=true`);

  //////////////////////////////////////////
  ////////// EVENT HANDLERS ///////////////

  //To show/hide voter names on click
  $(".dates_list").on("click", ".vote_counter", function (event) {
    let namesNotDisplayed = $(".popuptext").hasClass("popup-show");
    if (!namesNotDisplayed) {
      $(this).find(".popuptext").addClass("popup-show");
    } else {
      $(this).find(".popuptext").removeClass("popup-show");
    }
  });

  //helper function to create an object from the form input
  const objectifyForm = function (formArray) {
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++) {
      returnArray[formArray[i]["name"]] = formArray[i]["value"];
    }
    return returnArray;
  };

  $("#poll-submit-btn").click(function (event) {
    event.preventDefault();
    const array = $("#name-form").serializeArray();
    let votesObj = objectifyForm(array);
    votesObj.dates = [];
    votesObj.event_id = $(".main-wrapper").data("id");

    $("input[type=checkbox]:checked").each(function () {
      console.log($(this).val());
      votesObj.dates.push($(this).val());
    });
    console.log(votesObj.dates);
    $.ajax({ type: "POST", url: "/votes", data: votesObj })
      .done(function () {
        window.location.replace("/thank-you");
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

//Issue an ajax POST request action "/votes" (check with Luana)
//update the UI (select query)
//create the dynamic element/template for the user and append to html
