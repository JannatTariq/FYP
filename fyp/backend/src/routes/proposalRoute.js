const express = require("express");
const mongoose = require("mongoose");
const Proposal = mongoose.model("Proposal");
const User = mongoose.model("User");
const Constructor = mongoose.model("Constructor");
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
    // console.log(req.file.path, req.body);
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

router.get("/workerProposals", async (req, res) => {
  try {
    const proposals = await Proposal.find();
    // console.log(proposals);

    const proposalsWithUserInfo = await Promise.all(
      proposals.map(async (proposal) => {
        const user = await User.findById(proposal.userId);

        return {
          _id: proposal._id,
          userId: proposal.userId,
          username: user ? user.username : "Unknown",
          image: proposal.image,
          address: proposal.address,
          area: proposal.area,
          price: proposal.price,
          bedroom: proposal.bedroom,
          bathroom: proposal.bathroom,
        };
      })
    );

    res.status(200).json({
      success: true,
      proposals: proposalsWithUserInfo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching proposals.",
    });
  }
});

router.post("/submitBid", async (req, res) => {
  try {
    const { proposalId, bidPrice } = req.body;
    const existingProposal = await Proposal.findById(proposalId);
    if (!existingProposal) {
      return res.status(404).send({ error: "Proposal not found." });
    }

    existingProposal.status = "accepted";
    const bidderNameDocument = await Constructor.findById(req.user.id);
    const bidderName = bidderNameDocument.username;
    const bid = {
      userId: req.user.id,
      price: bidPrice,
      status: "pending",
      bidderName: bidderName,
    };
    existingProposal.bids.push(bid);
    await existingProposal.save();

    res.json({ success: true, proposals: existingProposal });
  } catch (error) {
    console.error("Error submitting bid:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/proposalsWithBids", async (req, res) => {
  try {
    const proposalsWithBids = await Proposal.find({
      "bids.0": { $exists: true },
    });
    // console.log(proposalsWithBids);

    res.json({ success: true, proposalsWithBids });
  } catch (error) {
    console.error("Error fetching proposals with bids:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/acceptBid", async (req, res) => {
  try {
    const { proposalId, bidId } = req.body;
    const existingProposal = await Proposal.findById(proposalId);

    if (!existingProposal) {
      return res.status(404).json({ error: "Proposal not found." });
    }

    const acceptedBid = existingProposal.bids.id(bidId);

    if (!acceptedBid) {
      return res.status(404).json({ error: "Bid not found." });
    }
    acceptedBid.status = "accepted";
    await existingProposal.save();

    res.json({ success: true, proposal: existingProposal });
  } catch (error) {
    console.error("Error accepting bid:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/rejectBid", async (req, res) => {
  try {
    const { proposalId, bidId } = req.body;
    const existingProposal = await Proposal.findById(proposalId);

    if (!existingProposal) {
      return res.status(404).json({ error: "Proposal not found." });
    }

    const rejectedBid = existingProposal.bids.id(bidId);

    if (!rejectedBid) {
      return res.status(404).json({ error: "Bid not found." });
    }

    rejectedBid.status = "rejected";
    await existingProposal.save();

    res.json({ success: true, proposal: existingProposal });
  } catch (error) {
    console.error("Error rejecting bid:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/workerProposals/:id", async (req, res) => {
  try {
    const proposalId = req.params.id;

    const proposal = await Proposal.findById(proposalId);
    if (!proposal) {
      return res.status(404).json({ error: "Proposal not found" });
    }

    await Proposal.findByIdAndDelete(proposalId);

    res.json({ success: true, message: "Proposal deleted successfully" });
  } catch (error) {
    console.error("Error deleting proposal:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
