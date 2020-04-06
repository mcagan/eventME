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

  $divDate.appendTo($liListRow);
  $divVoteCounter.appendTo($liListRow);
  $inputChackBox.appendTo($liListRow);
  $liListRow.appendTo($ulcontainAllList);

  // return final tweet element
  return $ulcontainAllList;
};


// WHEN DOCUMENT IS READY DO THE FOLLOWING
$(document).ready(function() {
  createListOfDates();
});
