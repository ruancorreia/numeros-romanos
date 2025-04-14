const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  score: { type: Number, default: 0 },
  completedAt: { type: Date },
});

module.exports = mongoose.model("User", userSchema);
