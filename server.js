const express = require('express');
const cors = require('cors');
const app = express();

const bodyParser = require('body-parser')

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;

const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())




const mongoDB = 'mongodb+srv://expodev:expodev123@payflex.d7ybj.mongodb.net/sample_airbnb?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {   useNewUrlParser: true,
useUnifiedTopology: true }).then(console.log("connected"));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const Schema = mongoose.Schema;

const schemaName = new Schema({
  request: String,
  time: Number
}, {
  collection: 'listingsAndReviews'
});
const Model = mongoose.model('Model', schemaName);


app.get('/text', (req, res) => {
  res.send('fdgfdgdfg')

})


app.get('/data', cors(), function(req, res) {
  var query = req.params.query;

  Model.find({
      'request': query
  }, function(err, result) {
      if (err) throw err;
      if (result) {
          res.json(result)
      } else {
          res.send(JSON.stringify({
              error : 'Error'
          }))
      }
  })
})

app.post('/post', (req, res) => {
  const user = {
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email,
    password: req.body.password

  }
   console.log('Got body:', req.body);
  res.sendStatus(200)
})


const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});