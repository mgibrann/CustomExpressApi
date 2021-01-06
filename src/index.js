const express = require("express");
const mongoose = require("mongoose");

const app = express();

//use  node 2.2.12
//useUnifiedTopology

const mongoUri =
  "mongodb://admin:admin@cluster0-shard-00-00.qkhyh.mongodb.net:27017,cluster0-shard-00-01.qkhyh.mongodb.net:27017,cluster0-shard-00-02.qkhyh.mongodb.net:27017/test?ssl=true&replicaSet=atlas-2puvv2-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// const MongoClient = require("mongodb").MongoClient;
// const uri =
//   "mongodb+srv://admin:admin@cluster0.qkhyh.mongodb.net/test?retryWrites=true&w=majority";

// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log(collection);
//   console.log(err);
//   client.close();
// });

mongoose.connection.on("connected", () => {
  console.log("connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.log("Eror connecting to mongo", err);
});

app.get("/", (req, res) => {
  res.send("Hi there!");
});

app.listen(3000, () => {
  console.log("listening from 3000");
});
