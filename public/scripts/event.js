/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// THIS FUNCTION WILL CREATE THE HTML ELEMENTS FOR A NEW TWEET
// TEMPLATE STILL SAVED AND COMMENTED IN INDEX.HTML
const createTweetElement = function(tweetObj) {


  //       <div class="a2a_kit a2a_kit_size_32 a2a_default_style">
  //         <a class="a2a_button_email"></a>
  //         <a class="a2a_button_facebook_messenger"></a>
  //         <a class="a2a_button_linkedin"></a>
  //         <a class="a2a_button_copy_link"></a>
  //       </div>
  //       <script async src="https://static.addtoany.com/menu/page.js"></script>
  //       <!-- AddToAny END -->
  //     </div>

  let $divEventHeader = $('<div>').addClass('event-header');
    $('<h2>').appendTo($divEventHeader);
    let $pByUser = $('<p>');
      $('<span>')
        .addClass('bolder-weigth')
        .text('By: ')
        .appendTo($pByUser);
    let $pByDate = $('<p>');
      $('<span>')
        .addClass('bolder-weigth')
        .text('On: ')
        .appendTo($pByDate);
    let $pByLocation = $('<p>');
      $('<span>')
        .addClass('bolder-weigth')
        .text('Location: ')
        .appendTo($pByLocation);
    let $divShareLink = $('<div>').addClass('a2a_kit a2a_kit_size_32 a2a_default_style')
      $('<a>')
        .addClass('a2a_button_emai')
        .appendTo($divShareLink);
      $('<a>')
        .addClass('a2a_button_facebook_messenger')
        .appendTo($divShareLink);
      $('<a>')
        .addClass('a2a_button_linkedin')
        .appendTo($divShareLink);
      $('<a>')
        .addClass('a2a_button_copy_link')
        .appendTo($divShareLink);


  // create the HTML for one poll event
  let $divPollContainer = $('<div>').addClass('poll_container');

  let $divParticipantContainer = $('<div>').addClass('poll_container_participan');
    $('<input>')
      .attr('type', 'text')
      .attr('value', 'Luana Duarte')
      .attr('id', 'participant_name')
      .attr('required', 'required')
      .attr('maxlength', '64')
      .appendTo($divParticipantContainer);


  //         <ul class="dates_list">
  //           <!-- every new date is it's own li with date / vote counter / and checkbox -->
  //           <li class="date_list_row">
  //             <!-- date -->
  //             <div class="date_option">
  //               <div class="d-month">Apr</div>
  //               <div class="d-date">7</div>
  //               <div class="d-day">Tue</div>
  //             </div>
  //             <!-- vote counter -->
  //             <div class="vote_counter">
  //               <div>0 votes</div>
  //             </div>
  //             <!-- checkbox -->
  //             <input type="checkbox" id="" name="" value="">
  //           </li>
  //           <!-- every new date is it's own li with date / vote counter / and checkbox -->
  //           <li class="date_list_row">
  //             <!-- date -->
  //             <div class="date_option">
  //               <div class="d-month">Apr</div>
  //               <div class="d-date">8</div>
  //               <div class="d-day">Wed</div>
  //             </div>
  //             <!-- vote counter -->
  //             <div class="vote_counter">
  //               <div>0 votes</div>
  //             </div>
  //             <!-- checkbox -->
  //             <input type="checkbox" id="" name="" value="">
  //           </li>
  //           <!-- every new date is it's own li with date / vote counter / and checkbox -->
  //           <li class="date_list_row">
  //             <!-- date -->
  //             <div class="date_option">
  //               <div class="d-month">Apr</div>
  //               <div class="d-date">9</div>
  //               <div class="d-day">Thu</div>
  //             </div>
  //             <!-- vote counter -->
  //             <div class="vote_counter">
  //               <div>0 votes</div>
  //             </div>
  //             <!-- checkbox -->
  //             <input type="checkbox" id="" name="" value="">
  //           </li>
  //         </ul>
  //       </div>

  // return final tweet element
  return $divEventHeader;
};


// WHEN DOCUMENT IS READY DO THE FOLLOWING
$(document).ready(function() {
});
