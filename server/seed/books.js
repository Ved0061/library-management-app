const mongoose = require("mongoose");
const Book = require("../models/Book");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

const books = [
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    image: "https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg"
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    image: "https://m.media-amazon.com/images/I/81wgcld4wxL.jpg"
  },
  {
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    image: "https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg"
  },
  {
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    image: "https://m.media-amazon.com/images/I/71UypkUjStL.jpg"
  },
  {
    title: "The Power of Now",
    author: "Eckhart Tolle",
    image: "https://m.media-amazon.com/images/I/61Ij8nLooNL.jpg"
  },
  {
    title: "Ikigai",
    author: "Héctor García & Francesc Miralles",
    image: "https://m.media-amazon.com/images/I/81l3rZK4lnL.jpg"
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    image: "https://m.media-amazon.com/images/I/71g2ednj0JL.jpg"
  },
  {
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen Covey",
    image: "https://m.media-amazon.com/images/I/81dQwQlmAXL.jpg"
  },
  {
    title: "Start With Why",
    author: "Simon Sinek",
    image: "https://m.media-amazon.com/images/I/71QUhm-AnIL.jpg"
  },
  {
    title: "You Can Win",
    author: "Shiv Khera",
    image: "https://m.media-amazon.com/images/I/71QKQ9mwV7L.jpg"
  }
];

const seedData = async () => {
  try {
    await Book.deleteMany();
    await Book.insertMany(books);
    console.log("✅ Real HD book images added");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedData();