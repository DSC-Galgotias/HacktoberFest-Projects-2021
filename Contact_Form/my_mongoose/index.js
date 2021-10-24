const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Atharva:atharvapatil123@cluster0.ymchp.mongodb.net/atharva?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("We are connected!!");//Is shown at end as it is non-blocking
}); 

const kittySchema = new mongoose.Schema({
  name: String
});//Tells which field will be present
kittySchema.methods.speak = function () {
  const greeting = "My name is " + this.name
  console.log(greeting);
}

const Kitten = mongoose.model('Mongoose', kittySchema);//Makes collection Mongooses in Real database
//schema is compiled into model

const MyKitten = new Kitten({ name: 'Cutie' });
const MyKitten2 = new Kitten({ name: 'Cutie2' });
// console.log(MyKitten.name); 
// MyKitten.speak();

// MyKitten.save(function (err, MyKitten) {
//   if (err) return console.error(err);
//   MyKitten.speak();
// });
// MyKitten2.save(function (err, MyKitten2) {
//   if (err) return console.error(err);
//   MyKitten2.speak();
// });

Kitten.find({name:"Cutie"},function (err, mongooses) {
  if (err) return console.error(err);
  console.log(mongooses);
})