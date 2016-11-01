var express = require("express");
var path = require("path");
var app = express();
var cons = require('consolidate');
var request = require("request");

var login;
var throttled;
var unlimited;

app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.get('/', function(req, res, next) {

  request("http://localhost:1338", function(error, response, body) {
    var myobj = JSON.parse(response.body);
    login = myobj.loggedIn;
    throttled = myobj.throttled;
    unlimited = myobj.unlimited;
  });

  next();

}, function(req, res, next) {
  if (!login) {
    res.render("login");
  }
  else {
    next();
  }
}, function(req, res, next) {

  if (unlimited) {
    res.render("unlimited");
  }
  else {
    next();
  }

}, function(req, res, next) {
  if (throttled) {
    res.render("throttled");
  }
  else {
    next();
  }
}, function(req, res, next) {
  if (!throttled) {
    res.render("unthrottled");
  }
});

app.listen(1337, function() {
  console.log("App listening on port 1337");
});
