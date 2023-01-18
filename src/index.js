require("./models/User");
require("./models/Track");
const express = require("express");

const authRouter = require("./routes/authRoute");
const trackRouter = require("./routes/trackRoute");
const { default: mongoose } = require("mongoose");

const bodyParser = require("body-parser");

const requireAuth = require("./middleware/requireAuth");



const app = express();
const port = 3000;

const uri =
  "mongodb+srv://Rajkumar:5E6ESCJdXj5hsIW6@cluster0.9bexyfx.mongodb.net/?retryWrites=true&w=majority";
mongoose.set("strictQuery", true);
mongoose.connect(uri);

mongoose.connection.on("connected", () => {
  console.log("connected to mongoose instance");
});

mongoose.connection.on("error", (error) => {
  console.log("Error connecting to mongoose ::::" + error);
});

app.use(bodyParser.json());
app.use(authRouter);
app.use(trackRouter);

app.get("/", requireAuth, (req, res) => res.send({ user: req.user }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
