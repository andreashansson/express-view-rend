var express = require("express");
var path = require("path");
var app = express();
var cons = require('consolidate');
var request = require("request");
var bodyParser = require('body-parser');

var myObj;
var login;
var throttled;
var unlimited;

app.use(bodyParser.urlencoded({extended: true}));

app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

var middleware = function(req, res, next) {



}

app.get('/api', function(req, res, next) {

  res.json({
    "loggedIn": false,
    "trottled": true,
    "unlimited": false
  });
});

app.get('/', function(req, res, next) {

  request("http://localhost:1337/api", function(error, response, body) {
    myobj = JSON.parse(response.body);
    login = myobj.loggedIn;
    throttled = myobj.throttled;
    unlimited = myobj.unlimited;
  });

  next();

}, function(req, res, next) {
  if (!login && login!==undefined) {
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
