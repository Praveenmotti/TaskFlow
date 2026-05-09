const express = require("express");
const router = express.Router();

const {
  createTeam,
  getTeams,
} = require("../controllers/teamController");

const protect = require("../middleware/auth");

router.post("/", protect, createTeam);
router.get("/", protect, getTeams);

module.exports = router;