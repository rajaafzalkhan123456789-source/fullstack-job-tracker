const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getJobs, createJob } = require("../controllers/jobController");

// Protected routes
router.get("/", auth, getJobs);
router.post("/", auth, createJob);

module.exports = router;
