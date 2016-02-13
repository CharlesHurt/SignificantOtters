'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
/*
var Firebase = require('firebase')

var firebaseRef = new Firebase("https://hw23significantotter.firebaseio.com/");
firebaseRef.set({
  user1:"Charles"
});
firebaseRef.set({ // This overrite the previous object at top level
  user2:"Regina"
});

firebaseRef.child("user1").on("value", function(snapshot) { // Async callback
  console.log('Snapshot*****' + snapshot.val());  // Alerts "San Francisco"
});*/



mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/datingapp');

function TestMongoose() {

  //var mongoose = require('mongoose');
  //mongoose.connect('mongodb://localhost/test');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console,'connection error:'));
  db.once('open',function() {
    // we're connected!

    // Create a schema (a template for data we are inserting)
    var chatSchema = mongoose.Schema({ name: String, data: String });

    // If we wanted to add methods on the model, we would need to do it here
    // before the model was codified

    chatSchema.methods.getData = function() {
      return this.data
    }

    chatSchema.methods.appendData = function(newData) {
      console.log('data b4:' + this.data);
      this.data += newData
      console.log('data after:' + this.data);
    }
    // These two methods (above) are exposed on instances of the chatSchema

    // Compile our schema into a model, (define a model using this schema)
    var ChatModel = mongoose.model('ChatModel', chatSchema);
    // Returns a constructor for making instances of the model
    // Once we have an instance, we can populate and save it.

    var chatInstance1 =  new ChatModel({name:'Charles', data: "Hello, it’s me"})
    var chatInstance2 =  new ChatModel({name:"Regina", data: "Hi, I’m here too"})

    chatInstance1.appendData("Hello there again ")
    chatInstance2.appendData("Hi to you too ")
    console.log('ch1:' + chatInstance1.getData( ))
    console.log('ch2:' + chatInstance2.getData( ))

    //Has the data been saved? or do we still need to do this:
    chatInstance1.save(function (err, xxx) {
      if (err) {
        return console.error(err);
      }
      console.log('**** Saved chat1');
      //chatInstance1.appendData("bla bla bla");
    });

    chatInstance2.save(function (err, xxx) {
      if (err) {
        return console.error(err);
      }
      console.log('**** Saved chat2');

    });

    //Now recall ALL the conversations
    ChatModel.find(function(err, chats) { // No specifics for find
      if (err) {
        return console.error(err);
      } else {
        console.log(chats);
      }
    })

    //Find a particular conversation:
    ChatModel.find({ name: /^nam/ }, aCallback); 


  })
}
function aCallback() {
  console.log('Callback arrived with:' + arguments[0]);
}
TestMongoose()

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

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
