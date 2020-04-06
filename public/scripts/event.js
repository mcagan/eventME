/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// THIS FUNCTION WILL CREATE THE HTML ELEMENTS FOR A NEW EVENT
const createListOfDates = function(listObj) {
  let $ulcontainAllList = $('ul.dates_list');
    let $liListRow = $('<li>').addClass('date_list_row');
      let $divDate = $('<div>').addClass('date_option');
        $('<div>')
          .text('text') // dummy to be removed
          .addClass('d-month')
          .appendTo($divDate);
        $('<div>')
          .text('text') // dummy to be removed
          .addClass('d-date')
          .appendTo($divDate);
        $('<div>')
          .text('text') // dummy to be removed
          .addClass('d-day')
          .appendTo($divDate);
      let $divVoteCounter = $('<div>').addClass('vote_counter');
        $('<p>')
          .text('0 votes') // dummy to be removed
          .appendTo($divVoteCounter);
      let $inputChackBox = $('<input>')
        .attr('type', 'checkbox')
        .attr('id', 'poll_checkbox')
        .attr('name', 'to-be-decided')
        .attr('value', 'to-be-decided');

  // this closes all elements appenddint to its parent
  // $divShareLink.appendTo($divEventHeader);
  // $pByUser.appendTo($divEventHeader);
  // $divEventHeader.appendTo($divMainWrapper);
  // $divParticipantContainer.appendTo(divPollContainer);
  $divDate.appendTo($liListRow);
  $divVoteCounter.appendTo($liListRow);
  $inputChackBox.appendTo($liListRow);
  $liListRow.appendTo($ulcontainAllList);
  // $divPollList.appendTo($divPollContainer);
  // $divParticipantContainer.appendTo($divPollContainer);
  // $divPollContainer.appendTo($divMainWrapper);

  // return final tweet element
  return $ulcontainAllList;
};


// WHEN DOCUMENT IS READY DO THE FOLLOWING
$(document).ready(function() {
  createListOfDates();
});






// IT WAS ALL DYNAMIC BUT APPERANTELY WE DONT NEED TO BE//////
/////////////
// let $divMainWrapper = $('<div>').addClass('main-wrapper');

// // ADDS A HEADER FOR EVENT'S TITLE, USER, DATE AND LOCATION + SHARE BUTTONS
// let $divEventHeader = $('<div>').addClass('event-header');
//   $('<h2>').appendTo($divEventHeader);
//   let $pByUser = $('<p>');
//     $('<span>')
//       .addClass('bolder-weigth')
//       .text('By: ')
//       .appendTo($pByUser);
//   let $pByDate = $('<p>');
//     $('<span>')
//       .addClass('bolder-weigth')
//       .text('On: ')
//       .appendTo($pByDate);
//   let $pByLocation = $('<p>');
//     $('<span>')
//       .addClass('bolder-weigth')
//       .text('Location: ')
//       .appendTo($pByLocation);
//   let $divShareLink = $('<div>').addClass('a2a_kit a2a_kit_size_32 a2a_default_style')
//     $('<a>')
//       .addClass('a2a_button_emai')
//       .appendTo($divShareLink);
//     $('<a>')
//       .addClass('a2a_button_facebook_messenger')
//       .appendTo($divShareLink);
//     $('<a>')
//       .addClass('a2a_button_linkedin')
//       .appendTo($divShareLink);
//     $('<a>')
//       .addClass('a2a_button_copy_link')
//       .appendTo($divShareLink);


// // EVENT POLL
// let $divPollContainer = $('<div>').addClass('poll_container');
// // user name
//   let $divParticipantContainer = $('<div>').addClass('poll_container_participan');
//     $('<input>')
//       .attr('type', 'text')
//       .attr('value', 'Luana Duarte')
//       .attr('id', 'participant_name')
//       .attr('required', 'required')
//       .attr('maxlength', '64')
//       .appendTo($divParticipantContainer);
//   // poll table
//   let $divPollList = $('div.poll_container_list');
