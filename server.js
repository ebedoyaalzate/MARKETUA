var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

// Serve static files....
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/dist/marketua'));

app.use(function (req, res, next) {
  res.header("Access-Controll-ALlow-Origin", "*");
  res.header("Access-Controll-ALlow-Methods", "DELETE, PUT");
  res.header("Access-Controll-ALlow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();

})

app.use(express.static('www'))

app.set('port', process.env.PORT || 5000)
app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));

});