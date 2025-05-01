const router = require("express").Router();
const Quiz = require("../models/Quiz");

// Get 10 random quizzes
router.get("/random", async (req, res) => {
  try {
    const quizzes = await Quiz.aggregate([{ $sample: { size: 10 } }]);
    res.json(quizzes);
  } catch (err) {
    console.error("Error fetching random quizzes:", err);
    res.status(500).json({ msg: "Failed to fetch quiz." });
  }
});

// Get all unique quiz categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Quiz.distinct("category");
    res.json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ msg: "Failed to fetch categories." });
  }
});

// Get quizzes by category
router.get("/category/:category", async (req, res) => {
  try {
    const { category } = req.params;

    if (!category) {
      return res.status(400).json({ msg: "Category is required." });
    }

    const quizzes = await Quiz.find({ category });

    if (!quizzes.length) {
      return res
        .status(404)
        .json({ msg: "No quizzes found for this category." });
    }

    res.json(quizzes);
  } catch (err) {
    console.error("Error fetching quizzes by category:", err);
    res.status(500).json({ msg: "Failed to fetch category quizzes." });
  }
});

module.exports = router;
