const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;


const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.get('/api/get', (req, res) => {
  res.send('Welcome Tp Express Api')

})

app.get('/api/gets', (req, res) => {
    res.sendFile(__dirname + '/client/index.html')
  
  })


app.post('/api/post', (req, res) => {
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