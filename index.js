import express from 'express';
import { resolve } from 'path';
import mongoose from 'mongoose';
import User from './Schema'; 

const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(express.json());

const mongodburl = "mongodb+srv:/test_db";

mongoose.connect(mongodburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB.");
}).catch((error) => {
  console.log("Error connecting to MongoDB:", error);
});

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.post('/create-user', async (req, res) => {
  const { username, email, password, firstName, lastName, age, roles } = req.body;
  try {
    const newUser = new User({
      username,
      email,
      password,
      roles,
      profile: {
        firstName,
        lastName,
        age
      }
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
