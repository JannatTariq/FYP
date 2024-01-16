const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  image: String,
  address: {
    type: String,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  bedroom: {
    type: Number,
    required: true,
  },
  bathroom: {
    type: Number,
    required: true,
  },
});

mongoose.model("Proposal", proposalSchema);
