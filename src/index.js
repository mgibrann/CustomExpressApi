require("./models/User");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

//use  node 2.2.12
//useUnifiedTopology
const mongoUri =
  "mongodb://admin:admin@cluster0-shard-00-00.qkhyh.mongodb.net:27017,cluster0-shard-00-01.qkhyh.mongodb.net:27017,cluster0-shard-00-02.qkhyh.mongodb.net:27017/test?ssl=true&replicaSet=atlas-2puvv2-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.log("Eror connecting to mongo", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`your emaiil: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("listening from 3000");
});
