const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  issueDate: { type: Date, default: Date.now },
  returnDate: Date,
  fine: { type: Number, default: 0 }
});

module.exports = mongoose.model("Issue", issueSchema);