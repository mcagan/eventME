/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// THIS FUNCTION WILL CREATE THE HTML ELEMENTS FOR A NEW TWEET
// TEMPLATE STILL SAVED AND COMMENTED IN INDEX.HTML
const createTweetElement = function(tweetObj) {

  // create the HTML for one poll event
  let $divPollContainer = $('<div>').addClass('poll_container');

  // <div class="poll_container">
  //         <!-- row containing date information + the first cell is always empty -->
  //         <div class="poll_container_participant">
  //           <img src="https://www.pngfind.com/pngs/m/5-59769_emoticon-text-smiley-messaging-emoji-png-image-high.png" alt="Smiley face" width="30" height="30" />
  //           <input type="text" value="Luana Duarte" id="participant_name" placeholder="Enter your name" required="required" maxlength="64" aria-label="Your name">
  //         </div>
  //         <!-- row containing the votes count -->
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
  return $divPollContainer;
};


// WHEN DOCUMENT IS READY DO THE FOLLOWING
$(document).ready(function() {
});
