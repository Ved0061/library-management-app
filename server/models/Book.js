const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  image: String, // ✅ NEW FIELD
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model("Book", bookSchema);