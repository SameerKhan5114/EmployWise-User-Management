require('dotenv').config();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("./models/User"); // Adjust path if needed

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const createUser = async () => {
  const hashedPassword = await bcrypt.hash("cityslicka", 10);
  const newUser = new User({
    firstName: "Eve",
    lastName: "Holt",
    email: "eve.holt@reqres.in",
    password: hashedPassword,
  });

  await newUser.save();
  console.log("✅ User created successfully!");
  mongoose.connection.close();
};

createUser();
