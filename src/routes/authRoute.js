const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });

    await user.save();

    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    return res.send({ token });
  } catch (error) {
    console.log(error);
    return res.status(422).send({ status: error.message });
  }
});

router.post("/signIn", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .send({ status: "failure", message: "Email or password can't be empty" });
  }
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    return res
      .status(401)
      .send({ status: "failure", message: "User doesn't exist" });
  }

  try {
    if ((await user.password) === password) {
      const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");

      res.send({ token });
    } else {
      res.send({
        status: "Failure",
        message: "Please enter correct email/password",
      });
    }
    // await user.comparePassword(password);
  } catch (error) {
    console.log(error + "Err");
    return res
      .status(422)
      .send({ status: "failure", message: "Invalid password/email" });
  }
});

module.exports = router;
