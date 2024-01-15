const express = require("express");
const mongoose = require("mongoose");
const Proposal = mongoose.model("Proposal");
const cloudinary = require("cloudinary");
const { geocode } = require("opencage-api-client");
const fs = require("fs").promises;

function validateAddress(response) {
  if (
    response &&
    response.status &&
    response.status.code === 200 &&
    response.results &&
    response.results.length > 0
  ) {
    const firstResult = response.results[0];
    if (
      firstResult.components &&
      firstResult.components.country === "Pakistan" &&
      firstResult.confidence &&
      firstResult.confidence >= 5
    ) {
      return true;
    }
  }

  return false;
}

const router = express.Router();

router.post("/uploadProposal", async (req, res) => {
  try {
    console.log(req.body);
    const imageData = await fs.readFile(image);
    console.log(imageData);

    const result = await cloudinary.v2.uploader.upload(imageData, {
      folder: "image",
      width: 250,
      crop: "scale",
    });

    const { address, area, price, bedroom, bathroom } = req.body;

    if (!address) {
      return res.status(422).send("Address is required");
    }

    const response1 = await geocode({
      q: `${address}, Pakistan`,
      key: "494016b2e2604b44932b85fe186be028",
    });

    const isValidAddress = validateAddress(response1);

    if (!isValidAddress) {
      return res.status(422).send("Invalid address");
    }

    const proposal = new Proposal({
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      address,
      area,
      price,
      bedroom,
      bathroom,
    });

    await proposal.save();

    res.status(201).json({
      success: true,
      proposal,
    });
  } catch (error) {
    res.status(400).json({
      error: "An error occurred during the uploading proposal process.",
    });
  }
});

module.exports = router;
