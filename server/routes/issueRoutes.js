const express = require("express");
const Issue = require("../models/Issue");
const Book = require("../models/Book");

const router = express.Router();

// ✅ GET all issues (with book & user details)
router.get("/", async (req, res) => {
  try {
    const issues = await Issue.find()
      .populate("book", "title author")
      .populate("user", "name");

    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ ISSUE BOOK
router.post("/", async (req, res) => {
  try {
    const { user, book } = req.body;

    // create issue
    const issue = await Issue.create({ user, book });

    // mark book as unavailable
    await Book.findByIdAndUpdate(book, { available: false });

    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ RETURN BOOK + FINE CALCULATION
router.put("/return/:id", async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    const today = new Date();

    const diffDays = Math.floor(
      (today - issue.issueDate) / (1000 * 60 * 60 * 24)
    );

    // fine logic (₹10 per day after 7 days)
    let fine = diffDays > 7 ? (diffDays - 7) * 10 : 0;

    issue.returnDate = today;
    issue.fine = fine;

    await issue.save();

    // mark book as available again
    await Book.findByIdAndUpdate(issue.book, { available: true });

    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/", async (req, res) => {
  const issues = await Issue.find()
    .populate("book", "title author")
    .populate("user", "name");

  res.json(issues);
});

module.exports = router;