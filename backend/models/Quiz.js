const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options: [String],
    correctIndex: Number,
    category: { type: String }, // <-- Added this line
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Quiz", quizSchema);
