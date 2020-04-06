// $(() => {
//   $("#submit").submit(function(event) {
//   event.preventDefault();
//   $("#error").empty();
//   let tweetLength = $("textarea").val().length;
//   let data = $(this).serialize();
//   if (tweetLength === 0) {
//     $("#error").text("⚠️ Please enter a tweet");
//   } else if (tweetLength > 140) {
//     $("#error").text("⚠️ Character count can't exceed maximum");
//   } else {
//     $.ajax({ method: "POST", url: "/tweets", data })
//       .done(function(result) {
//         $("#tweet-text").val("");
//         loadtweets(result);
//       })
//       .fail(function(error) {
//         // Problem with the request
//         console.log(`Error with the request: ${error.message}`);
//       })
//       .always(function() {
//         // This will always run
//         console.log("request completed");
//       });
//   }
// })
// });
