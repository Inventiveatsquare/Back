const express = require('express');
const cors = require('cors');
const app = express();

const bodyParser = require('body-parser')

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;


const Mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



const mongoDB = 'mongodb+srv://expodev:expodev123@payflex.d7ybj.mongodb.net/payflex?retryWrites=true&w=majority';
Mongoose.connect(mongoDB, {   useNewUrlParser: true,
  useUnifiedTopology: true }).then(console.log("connected"));

const PersonModel = Mongoose.model("admin_user", {
  firstname: String,
  lastname: String
});
app.post("/person", async (request, response) => {
  try {
      var person = new PersonModel(request.body);
      var result = await person.save();
      response.send(result);
  } catch (error) {
      response.status(500).send(error);
  }
})


app.get('/text', (req, res) => {
  res.send('fdgfdgdfg')

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