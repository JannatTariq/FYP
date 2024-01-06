const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");
const Constructor = mongoose.model("Constructor");
const { geocode } = require("opencage-api-client");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

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

function isValidCity(response) {
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
      firstResult.confidence >= 5
    ) {
      return true;
    }
  }

  return false;
}

function isPDF(fileName) {
  console.log(fileName);
  if (!fileName) {
    return false; // Handle the case where uploadedDocument is undefined or null
  }
  const extension = fileName.split(".").pop().toLowerCase();
  return extension === "pdf";
}

router.post("/signupClient", async (req, res) => {
  const { username, email, password, confirmPassword, address } = req.body;

  try {
    if (password !== confirmPassword) {
      return res.status(422).send("Passwords do not match");
    }
    if (!address) {
      return res.status(422).send("Address is required");
    }
    const response = await geocode({
      q: `${address}, Pakistan`,
      key: "494016b2e2604b44932b85fe186be028",
    });

    const isValidAddress = validateAddress(response);

    if (!isValidAddress) {
      return res.status(422).send("Invalid address");
    }
    const user = new User({
      username,
      email,
      password,
      confirmPassword,
      address,
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");

    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: "Must provide email and password" });
  }

  const user = await User.findOne({ email });
  const constructor = await Constructor.findOne({ email });

  if (!user && !constructor)
    return res.status(422).send({
      error: "Email not found",
    });

  try {
    if (user != null) {
      await user.comparePassword(password);
      const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");

      res.send({ token });
    }
  } finally {
    if (constructor != null) {
      await constructor.comparePassword(password);
      const token = jwt.sign({ userId: constructor._id }, "MY_SECRET_KEY");

      res.send({ token });
    }
  }
});

router.post(
  "/signupConstructor",
  upload.single("document"),
  async (req, res) => {
    const {
      firstname,
      lastname,
      username,
      email,
      password,
      confirmPassword,
      city,
      address,
      // role,
    } = req.body;

    const uploadedDocument = req.file; // Uploaded file
    console.log(uploadedDocument);

    try {
      if (password !== confirmPassword) {
        return res.status(422).send("Passwords do not match");
      }
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
      const response = await geocode({
        q: `${city}, Pakistan`,
        key: "494016b2e2604b44932b85fe186be028",
      });
      if (!isValidCity(response)) {
        return res.status(400).send({ error: "Invalid city" });
      }

      if (!uploadedDocument) {
        return res.status(422).send("Document is required");
      }

      if (!isPDF(uploadedDocument.originalname)) {
        return res
          .status(422)
          .send("Invalid document format. Only PDF files are allowed.");
      }

      const user = new Constructor({
        firstname,
        lastname,
        username,
        email,
        password,
        confirmPassword,
        city,
        address,
        uploadedDocument: uploadedDocument.buffer, // Store file data
        // role,
      });

      await user.save();

      res.status(201).send({ message: "User created successfully" });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
);

module.exports = router;
