const Team = require("../models/Team");

// Create Team
exports.createTeam = async (req, res) => {
  try {
    const team = await Team.create({
      name: req.body.name,
      members: [req.user._id],
      createdBy: req.user._id,
    });

    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get My Teams
exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.find({
      members: req.user._id,
    }).populate("members", "name email");

    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};