const router = require("express").Router();
const Quiz = require("../models/Quiz");
const User = require("../models/User");
const Category = require("../models/Category");

// Middleware to check admin role
function isAdmin(req, res, next) {
  const { role } = req.headers;
  if (role !== "admin") return res.status(403).json({ msg: "Access denied" });
  next();
}

// Create a new quiz
router.post("/add-quiz", isAdmin, async (req, res) => {
  const { question, options, correctIndex, category } = req.body;

  try {
    const quiz = new Quiz({ question, options, correctIndex, category });
    await quiz.save();
    res.json({ msg: "Quiz added", quiz });
  } catch (err) {
    res.status(500).json({ msg: "Quiz creation failed" });
  }
});

// Update quiz
router.put("/update-quiz/:id", isAdmin, async (req, res) => {
  const { question, options, correctIndex, category } = req.body;

  try {
    const updated = await Quiz.findByIdAndUpdate(
      req.params.id,
      { question, options, correctIndex, category },
      { new: true }
    );
    res.json({ msg: "Quiz updated", quiz: updated });
  } catch (err) {
    res.status(500).json({ msg: "Update failed" });
  }
});

// Delete quiz
router.delete("/delete-quiz/:id", isAdmin, async (req, res) => {
  try {
    await Quiz.findByIdAndDelete(req.params.id);
    res.json({ msg: "Quiz deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Delete failed" });
  }
});

// Get all users
router.get("/users", isAdmin, async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch users" });
  }
});

//
// ===== Category Routes =====
//

// Add new category
router.post("/add-category", isAdmin, async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ msg: "Category name required" });

  try {
    const exists = await Category.findOne({ name });
    if (exists) return res.status(400).json({ msg: "Category already exists" });

    const category = new Category({ name });
    await category.save();
    res.status(201).json({ msg: "Category added", category });
  } catch (err) {
    res.status(500).json({ msg: "Category creation failed" });
  }
});

// Get all categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch categories" });
  }
});

module.exports = router;
