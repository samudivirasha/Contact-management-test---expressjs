const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());


//let x = 5;

let mymap = new Map();




// Sample route
app.get('/showdata', (req, res) => {
  const mapObj = Object.fromEntries(mymap);
  res.json(mapObj);
});

app.get('/showdata/:name', (req, res) => {
  res.send(mymap.get(req.params.name));
});


app.post('/adddata', function(req, res) {
var name = req.body.name;
var contact = req.body.contact;

mymap.set (name,contact);
  console.log('body is ',req.body);
  res.send(req.body);
});

app.post('/showdatapost', function(req, res) {
  var name = req.body.name;
  console.log("name is",name);
  res.send(mymap.get(name));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


