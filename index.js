const express = require('express');
const mongoose = require("mongoose");

const app = express();
const port = 3000;
// Middleware to parse JSON bodies
app.use(express.json());

const mongoURI = "mongodb://localhost:27017/contactdb";
mongoose.connect(mongoURI,{useNewUrlParser: true, useUnifiedTopology: true});


const db = mongoose.connection;
db.on ('error',console.error.bind(console, 'Mongodb connection error:'));
db.once('open', () => {
console.log('connected to mongodb');
});

const contactsSchema = new mongoose.Schema({
   name : String,
   contact : String
});

const Contact = mongoose.model('contact', contactsSchema);

//let x = 5;

//let mymap = new Map();
app.post('/adddata', function(req, res) {
  var reqname = req.body.name;
  var reqcontact = req.body.contact;
  
  
  const cont = new Contact({
    name:reqname,
    contact:reqcontact
  })
  
  cont
  .save()
  .then(() => res.send(req.body) , (err) => res.send(err));
  });



// Sample route
app.get('/showdata', async (req, res) => {
  const contacts = await Contact.find({}).lean();
  res.json({contacts:contacts});
});

app.get('/showdata/:name', (req, res) => {
  res.send(mymap.get(req.params.name));
});




app.post('/showdatapost', function(req, res) {
  var name = req.body.name;
  console.log("name is",name);
  res.send(mymap.get(name));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


