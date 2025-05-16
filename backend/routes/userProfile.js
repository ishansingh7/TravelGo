const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

// GET user profile
router.get("/profile", authenticate, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Unable to fetch user profile." });
  }
});

module.exports = router;
