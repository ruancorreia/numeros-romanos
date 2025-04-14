import mongoose from "mongoose";

const rankingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Ranking ||
  mongoose.model("Ranking", rankingSchema);
