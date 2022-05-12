const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const date = require(__dirname + "/date.ejs");

const app = express();
app.set('views', __dirname+'/views')
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


mongoose.connect("mongodb://localhost:27017/todolist",{useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true});
const listSchema = ({
  name: String
});
const List = mongoose.model("List",listSchema)
const Wlist = mongoose.model("Wlist",listSchema)
const study = new List({
  name: "study"
});
const read = new List({
  name: "read"
});
const wright = new List({
  name: "wright"
});

//...................INSERT.................
const list = [study,read,wright];
// List.insertMany(tList,(err)=>{
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("success....");
//   }
// });

//..................................DELETE............................
// List.deleteMany({name:["study","read","wright","study","read","wright"]},(err)=>{
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("success");
//   }
// });
// List.deleteOne({name:["study","read","wright","study","read","wright"]},(err)=>{
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("ok");
//   }
// })

app.get("/", async (req,res)=>{
    var toy = date.getday();
    let list = await List.find();
    res.render('list', {listTittle : toy, items : list});
});

app.get("/work", (req,res)=>{
  res.render('list',{listTittle : "Work List", items: Wlist.find()});
})
app.get("/about",(req,res)=>{
  res.render("about");
})


app.post("/",(req,res)=>{
  var items = req.body.listItem;
  const item = new Wlist({
    name: items
  })
  // console.log(req.body.listType);
  if(req.body.listType==="Work"){
     Wlist.insertMany({name:items} ,(err)=>{
       if (err) {
         console.log(err);
       } else {
         console.log("ok");
       }
     })
     res.redirect("/work")
  }
  else{
    if (item!=="") {
     list.push(item);
    }
    res.redirect("/");
  }
});

// app.post("/work",(req,res)=>{
//   {
//
//   }
// })
app.listen(3000, ()=>{
  console.log("running.....");
})
