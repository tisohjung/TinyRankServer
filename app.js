var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var http = require('http');
var db = require('./mongo.js');
var PORT = 9999;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, 'node_modules/jquery/dist')));

db.connect();

app.get('/', function(req, res) {
    res.render("index", {title:"EOE Rank Server"});
});

app.get('/rank', function(req, res) {
    db.findAllRank(function(items) {
        //res.json(items);
        res.render('rank', {items: items});
    });
});

app.post('/rank', function(req, res) {
    var query = req.body;
    db.insertRank(query, function(item) {
        res.redirect('/rank');
    });
});

app.get('/rankjson', function(req, res) {
    db.findAllRank(function(items) {
        res.json(items);
    });
});

app.post('/remove', function(req, res) {
    var query = req.body;
    db.removeRank(query, function(removed) {
        res.json({success : removed});
    });
});
app.get('/new', function(req, res) {
    res.render('new');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

http.createServer(app).listen(PORT, function() {
    console.log("Server started at port : " + PORT);
});