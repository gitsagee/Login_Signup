const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const loginDet = require("./components/db/modal.js");
const port = process.env.PORT || 3000;

require("./components/db/connect.js");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const JWT_SECRET = process.env.JWT_SECRET; 

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const findUser = await loginDet.findOne({ username });

    if (findUser) {
      const isMatch = await bcrypt.compare(password, findUser.password);
      if (isMatch) {
        const token = jwt.sign({ _id: findUser._id, email: findUser.email }, JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token, id: findUser._id, email: findUser.email });
      } else {
        res.status(401).send("Invalid login credentials");
      }
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { username, password, confirm_password, gender, email } = req.body;
    if (password === confirm_password) {
      const user = new loginDet({ username, password, gender, email });
      await user.save();
      res.status(201).send("Signup successful");
    } else {
      res.status(400).send("Passwords do not match");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).send('Access Denied');
  }
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};


app.get('/api/protected', authMiddleware, (req, res) => {
  res.status(200).send('This is a protected route');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
