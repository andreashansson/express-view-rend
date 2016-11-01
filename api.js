var express = require('express');
var app = express();

app.get('/', function(req, res) {

  res.json({
    loggedIn: false,
    throttled: false,
    unlimited: false
  });
});

app.listen(1338, function(req, res) {
  console.log("API RUNNING ON PORT 1338");
});
