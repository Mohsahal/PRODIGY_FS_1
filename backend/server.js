require("dotenv").config(); // Load environment variables

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3001", credentials: true })); // Allow frontend requests

// Connect to MongoDB (Ensure MONGO_URI is in .env file)
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => console.error(" MongoDB Connection Error:", err.message));

// User model
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

// **Sign up Route**



// **SignUp Route**
app.post("/SignUp", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // **Check if user already exists**
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // **Hash Password**
    const hashedPassword = await bcrypt.hash(password, 10);

    // **Save User**
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: " User registered successfully!" });
  } catch (error) {
    console.error(" Registration Error:", error.message);
    res.status(500).json({ message: "Server error, please try again later" });
  }
});




// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body)

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ message: "Login successful!", token });
  } catch (error) {
    console.error(" Login Error:", error.message);
    res.status(500).json({ message: "Server error, please try again later" });
  }
});

// **Start Server**
const PORT = process.env.PORT || 200;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));



