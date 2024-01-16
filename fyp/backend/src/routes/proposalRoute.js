const express = require("express");
const mongoose = require("mongoose");
const Proposal = mongoose.model("Proposal");
const cloudinary = require("cloudinary");
const { geocode } = require("opencage-api-client");
const multer = require("multer");
const requireAuth = require("../middlewares/requireAuth");

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("invalid image file!", false);
  }
};
const uploads = multer({ storage, fileFilter });
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
router.use(requireAuth);

router.post("/uploadProposal", uploads.single("profile"), async (req, res) => {
  try {
    const userId = req.user._id;
    // console.log(req.file, req.body);
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "image",
      width: 250,
      crop: "fill",
    });
    // console.log(result);

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
      userId: userId,
      image: result.url,
      address,
      area,
      price,
      bedroom,
      bathroom,
    });

    await proposal.save();
    // console.log(proposal);
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

router.get("/getProposals", async (req, res) => {
  // console.log(req.user._id);
  const proposal = await Proposal.find({ userId: req.user._id });
  // console.log(proposal);
  res.status(201).json({
    success: true,
    proposal,
  });
});

module.exports = router;
