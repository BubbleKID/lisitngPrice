var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/start', function(req, res){

  console.log(req.query);
  const Ebay = require("ebay-node-api");
 
  let ebay = new Ebay({
      clientID: "XinChen-TestSyst-PRD-c1c8569b9-73b085bf",
      clientSecret: 'PRD-1c8569b96fff-8552-47b2-adae-34a1',
      body: {
          grant_type: "client_credentials",
          scope: 'https://api.ebay.com/oauth/api_scope'
      }
  });
    // Get access token and pass it to this method
  ebay.getAccessToken()
  .then((data) => {

    
      ebay.getItem('v1|'+ req.query.id_a1 + '|0').then((dataA) => {
          console.log(dataA);    

          ebay.getItem('v1|' + req.query.id_a2 + '|0').then((dataB) => {
                console.log(dataB);
                //res.send("WHEEE");
                res.send({
                    //title: 'EBAY',
                    id_A: dataA.itemId,
                    title_A: dataA.title,
                    price_A: dataA.price.convertedFromValue,
                    image_A: dataA.image.imageUrl,
                    id_B: dataB.itemId,
                    title_B: dataB.title,
                    price_B: dataB.price.convertedFromValue,
                    image_B: dataB.image.imageUrl
                });  
                
                
            })
        });         
    })
 });


 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
