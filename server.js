const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;


const app = express();
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = 'mongodb+srv://expodev:expodev123@payflex.d7ybj.mongodb.net/sample_weatherdata?retryWrites=true&w=majority';
mongoose.connect(db, {   
  useNewUrlParser: true,
  useUnifiedTopology: true
 }
 ).then(console.log("connected"));


 var schemaName = new Schema({
  request: String,
  time: Number
}, {
  collection: 'accounts'
});

var Model = mongoose.model('Model', schemaName);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.send (
    mongoose.connect(db, {   
      useNewUrlParser: true,
      useUnifiedTopology: true
     })
  ).then(console.log("connected"));

})
app.get('/get', (req, res) => {
  res.send('Welcome Tp Express Api')

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

app.get('/gets', (req, res) => {
    res.sendFile(__dirname + '/client/index.html')
  
  })


app.post('/post', (req, res) => {
  const user = {
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email,
    password: req.body.password

  }
  console.log(user);
  //console.log('Got body:', req.body);
  res.sendStatus(200);
});

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