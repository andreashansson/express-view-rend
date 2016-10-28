var express = require("express");
var path = require("path");
var app = express();
var cons = require('consolidate');

var login = true;
var throttled = false;

app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use('/', function(req, res, next) {
  if (!login) {
    res.render("login");
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
  console.log("App i listening on port 1337");
});
