Parse.Cloud.define("sendPushToUser", function(request, response) {
  var senderUser = request.user;
  var _members = request.params.members;
  var message = request.params.message;

  // Validate the message text.
  // For example make sure it is under 140 characters
  if (message.length > 140) {
  // Truncate and add a ...
    message = message.substring(0, 137) + "...";
  }

  // Send the push.
  // Find devices associated with the recipient users
  var query = new Parse.Query(Parse.User);
  query.containedIn("objectId", _members);
  query.notEqualTo("objectId", senderUser.objectId);

  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.matchesQuery("user", query);
 
  // Send the push notification to results of the query
  console.log('Sending a message push to ' + _members + ' with message: ' + message);
  Parse.Push.send({
    where: pushQuery,
    data: {
      alert: message,
      badge: "Increment"
      //p: "m"
    }
  }, { useMasterKey: true })
  .then(function() {
      response.success("Push was sent successfully.")
  }, function(error) {
      response.error("Push failed to send with error: " + error.message);
  });
});