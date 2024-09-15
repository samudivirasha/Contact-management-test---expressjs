const express = require('express');
const mongoose = require("mongoose");


//app setup
const app = express();
const port = 3000;
// Middleware to parse JSON bodies
app.use(express.json());

//connect to db
const mongoURI = "mongodb://localhost:27017/contactdb";
mongoose.connect(mongoURI,{useNewUrlParser: true, useUnifiedTopology: true});

//check if mongodb is connected
const db = mongoose.connection;
db.on ('error',console.error.bind(console, 'Mongodb connection error:'));
db.once('open', () => {
console.log('connected to mongodb');
});

//Schema
const contactsSchema = new mongoose.Schema({
   name : String,
   contact : String
});

//model
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
  if (contacts.length == 0){
    res.send("no data found");
  }

  res.json({contacts:contacts});
});

app.get('/showdata/:name', async (req, res) => {
  const reqname = req.params.name;
  const contacts = await Contact.find({name : reqname}).lean();
  if (contacts.length == 0){
    res.send("no data found");
  }
  res.json({name : contacts[0].name, contact : contacts[0].contact});
});




//update data in mdb
app.put('/updatedata/:name', async (req, res) => {
  const reqname = req.params.name;
  const reqcon = req.body.contact;

  const contact = await Contact.findOneAndUpdate (
    {name:reqname},
    {contact:reqcon},
    {new:true}

  );

  if (!contact){
    res.send ("data not found");
    }

    res.json({name : contact.name, contact : contact.contact});

});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


