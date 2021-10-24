// Express is mostly used for routing
const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const bodyparser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://Atharva:atharvapatil123@cluster0.ymchp.mongodb.net/ContactPage?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const contactSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  address: String,
  more: String,
});

const Contact = mongoose.model("Contact", contactSchema);
// console.log(Contact.find({}));
port = 80;
//for serving static file
// Static files are files that clients download as they are from the server. Create a new directory, public. Express, by default does not allow you to serve static files. You need to enable it using the following built-in middleware.
app.use("/static", express.static("static")); //static is folder name
// A template engine enables you to use static template files in your application. At runtime, the template engine replaces variables in a template file with actual values, and transforms the template into an HTML file sent to the client. This approach makes it easier to design an HTML page.
//Set the template engine pug : Takes input for name, id or other info and put at places in proper html format
app.set("view engine", "pug");

//To bring data to express
app.use(express.urlencoded());

// Set the views directory

// Our pug demo endpoint
// app.get('/', function (req, res) {
//     res.status(200).render('demo', { title: 'Hey Atharva', message: 'Hello there!', name : 'Atharva Pradeep Patil' })
//   })
app.get("/", function (req, res) {
  const some = "Kuch bhi";
  const params = { title: "Sweet Cupcakes", content: some };
  res.status(200).render("index", params);
});

app.get("/portfolio", (req, res) => {
  //When we go to /
  // res.send("This is my home page of first express app");
  params = { nothing: "nothing" };
  res.status(200).render("portfolio.pug", params);
});
app.get("/home", (req, res) => {
  //When we go to /
  // res.send("This is my home page of first express app");
  params = { title: "Home" };
  res.status(200).render("home.pug", params);
});
app.get("/about", (req, res) => {
  //When we go to /
  res.send("This is my about page of first express app");
});
// app.post("/",(req,res)=>{//When we go to /
//     // console.log(req.body);
//     names = req.body.name;
//     age = req.body.age;
//     gender = req.body.gender;
//     address = req.body.address;
//     more = req.body.more;

//     let OutputToWrite = `The name of the customer is ${names}, ${age} years old, ${gender}, residing at ${address}. More about him/her : ${more}.`
//     // let OutputToWrite = `${names},${age},${gender},${address},${more}`
//     fs.writeFileSync('output.txt',OutputToWrite);
//     const params = {message:"Your form has been submitted successfully!"};
// res.status(200).render('index.pug',params) ;
// })
async function f() {
  var d = await Contact.find({ name: `$req.body.name` }).select({
    name: 1,
    _id: 0,
  });
  console.log(d);
}

app.post("/", async (req, res) => {
  let myData = new Contact(req.body);
  myData
    .save()
    .then(() => {
      //returrns a promise after save
      // res.status(200).render('index.pug') ;
      // req.flash('success', 'Thanks for the message! I’ll be in touch :)');
      res.status(200).render("index.pug");
    })
    .catch(() => {
      res.status(404).send("Item not saved in database :(");
    });
  f();
});
app.get("/atharva", (req, res) => {
  res.status(200).send("Hey atharva??");
});
app.listen(port, () => {
  console.log(`My application running on port : ${port}`);
});
