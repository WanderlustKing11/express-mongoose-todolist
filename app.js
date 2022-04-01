//jshint esversion:6

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const init = new Date();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/todolistDB',
{ useNewUrlParser: true }, (err) => {
  if(!err) {
    console.log("Connected to MongoDB.");
    const time = new Date() - init;
    console.log(`Connection took ${time} ms.`);
  } else {
    console.log(err.message);
  }
});

const itemsSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model('Item', itemsSchema);

const item1 = new Item ({
  name: "Welcome to your todolist!"
});

const item2 = new Item ({
  name: "Hit the + button to add a new item."
});

const item3 = new Item ({
  name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

// Item.insertMany(defaultItems, (err) => {
//   if (!err) {
//     console.log("Successfully saved defaultItems to todolistDB.");
//   } else {
//     console.log(err.message);
//   }
// });

app.get('/', function(req, res) {

  Item.find({}, (err, foundItems) => {
    if(!err) {
      res.render('list', {listTitle: "Today", newListItems: foundItems});
    } else {
      console.log(err);
    };
  });
});

app.post('/', function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect('/work');
  } else {
    items.push(item);
    res.redirect('/');
  }
});

app.get('/work', function(req,res){
  res.render('list', {listTitle: "Work List", newListItems: workItems});
});

// app.post('/work', function(req, res) {
//   let item = req.body.newItem;
//   workItems.push(item);
//   res.redirect('/work');
// });

app.get('/about', function(req, res){
  res.render('about');
});

app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
