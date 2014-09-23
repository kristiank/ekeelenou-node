
/**
 * @module ekeelenou
 */

var express = require('express');
var routes  = require('./routes');
var user    = require('./routes/user');
var http    = require('http');
var path    = require('path');
//~ var io      = require('socket.io');
var ekn     = require('./lib/ekeelenou-server');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon(
    path.join(__dirname, 'public', 'images', 'favicon.ico')
));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/dokumentatsioon', express.static(path.join(__dirname, 'public', 'dokumentatsioon')));
app.get('/users', user.list); // @todo: mis asi see on?

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

// initialize the ekeelenõu server with own sockets
var io = require('socket.io')(server);
io.sockets.on('connection', function(socket) {
  ekn.initUserSocket(io, socket);
});
