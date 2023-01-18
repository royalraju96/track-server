const express = require("express");
const mongoose = require("mongoose");
const autoRoute = require("./authRoute");
const requireAuth = require("../middleware/requireAuth");

const Track = mongoose.model("Track");

const router = express.Router();

router.use(requireAuth);

router.get("/tracks", async (req, res) => {
  const tracks = await Track.find({ userId: req.user._id });

  res.status(200).send({ data: tracks });
});

router.post("/tracks", async (req, res) => {
  const { name, locations } = req.body;

  if (!name || !locations) {
    return res
      .status(422)
      .send({ status: "failure", message: "Name/Locations can't be empty" });
  }
  const track = Track({ name, locations, userId: req.user._id });

  try {
	await track.save();
	
	  res.send({ status: "Track saved successfully", data: track });
} catch (error) {
	return res
      .status(422)
      .send({ status: "failure", message: "Name/Locations can't be empty" });
}
});

module.exports = router;
