require("dotenv").config();
const express = require("express");
const Stripe = require("stripe");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

router.post("/payment", requireAuth, async (req, res) => {
  try {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    const { amount } = req.body;
    // console.log(process.env.STRIPE_SECRET_KEY);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",

      metadata: { integration_check: "accept_a_payment" },
    });
    res.json({
      success: true,
      client_secret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error processing payment:", error.message);
    res
      .status(500)
      .json({ success: false, error: "Payment processing failed" });
  }
});

router.get("/getStripeApiKey", requireAuth, async (req, res) => {
  res.json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});

module.exports = router;
