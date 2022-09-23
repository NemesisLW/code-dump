const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const Date = require(__dirname + "/date.js");
const day = Date.getDate();

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
});

const itemsSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemsSchema);

const defaultItems = [];

const listSchema = {
  name: String,
  items: [itemsSchema],
};

const List = mongoose.model("List", listSchema);

app.get("/", (req, res) => {
  Item.find({}, (err, foundItems) => {
    res.render("list", { listTitle: day, newListItems: foundItems });
  });
});

app.get("/:list", (req, res) => {
  const listName = _.capitalize(req.params.list);

  List.findOne({ name: listName }, (err, foundList) => {
    if (!err) {
      if (!foundList) {
        //Create a new list
        const list = new List({
          name: listName,
          items: defaultItems,
        });
        list.save();
        res.redirect(`/${listName}`);
      } else {
        //Show an existing list

        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items,
        });
      }
    }
  });
});

app.post("/", (req, res) => {
  const toDoItem = req.body.newItem;
  const listName = req.body.list;
  const newItemtoadd = new Item({ name: toDoItem });

  if (listName === day) {
    newItemtoadd.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listName }, (err, foundList) => {
      foundList.items.push(newItemtoadd);
      foundList.save();
      res.redirect(`/${listName}`);
    });
  }
});

app.post("/delete", (req, res) => {
  const doneItemId = req.body.doneItem;
  const listName = req.body.listName;

  if (listName === day) {
    Item.findByIdAndRemove(doneItemId, (err) => {
      if (!err) {
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: doneItemId } } },
      (err, foundList) => {
        if (!err) {
          res.redirect("/" + listName);
        }
      }
    );
  }
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
