//jshint esversion:6

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const init = new Date();

app.set('view engine', 'ejs');

app.use(express.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/todolistDB', {
  useNewUrlParser: true
}, (err) => {
  if (!err) {
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

const item1 = new Item({
  name: "Welcome to your todolist!"
});

const item2 = new Item({
  name: "Hit the + button to add a new item."
});

const item3 = new Item({
  name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model('List', listSchema);

app.get('/', function(req, res) {

  Item.find({}, (err, foundItems) => {
    if (!err) {
      if (foundItems.length === 0) {
        Item.insertMany(defaultItems, (err) => {
          if (!err) {
            console.log("Successfully saved defaultItems to todolistDB.");
          } else {
            console.log(err.message);
          }
        });
        res.redirect('/');
      } else {
        res.render('list', {
          listTitle: "Today",
          newListItems: foundItems
        });
      }
    } else {
      console.log(err);
    };
  });
});

app.get('/category/:customListName', (req, res) => {
  const customListName = req.params.customListName;

  const list = new List({
    name: customListName,
    items: defaultItems
  });

  list.save();
});

app.post('/', (req, res) => {

  const itemName = req.body.newItem;

  const item = new Item({
    name: itemName
  });

  item.save();

  res.redirect('/');

});

app.post('/delete', (req, res) => {
  const checkedItemId = req.body.checkbox;

  Item.findByIdAndRemove(checkedItemId, (err) => {
    if (!err) {
      console.log("Successfully deleted checked item from todolistDB.");
    } else (
      console.log(err)
    )
  });

  res.redirect('/');
});

// app.post('/work', function(req, res) {
//   let item = req.body.newItem;
//   workItems.push(item);
//   res.redirect('/work');
// });

app.get('/about', (req, res) => {
  res.render('about');
});

app.listen(3000, () => {
  console.log("Server started on port 3000.");
});
